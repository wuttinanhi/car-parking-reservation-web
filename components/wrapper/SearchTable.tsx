"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Alert, Button, Form, InputGroup, Stack, Table } from "react-bootstrap";
import { PaginationOptions } from "../../libs/pagination";

export interface SearchTableProps {
  fetcher(opts: PaginationOptions): Promise<any[]>;
  headers: string[];
  renderRow?: (item: any, index: number) => JSX.Element;
}

export function SearchTable({ fetcher, headers, renderRow }: SearchTableProps) {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<any[]>([]);

  const [orderBy, setOrderBy] = useState<string>("id");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<number>(0);

  const [error, setError] = useState<string>("");
  const [hideLoadButton, setHideLoadButton] = useState<boolean>(true);

  function renderHeader() {
    return headers.map((header, index) => (
      <th key={index} scope="col">
        {header}
      </th>
    ));
  }

  function defaultRenderRow(item: any, index: number) {
    return (
      <tr key={index}>
        {Object.values(item).map((value: any, index) => (
          <td key={index}>{value}</td>
        ))}
      </tr>
    );
  }

  function internalRenderRow() {
    if (renderRow) {
      return data.map(renderRow);
    }
    return data.map(defaultRenderRow);
  }

  function renderError() {
    if (!error) return null;
    return (
      <Alert variant="danger" className="my-5">
        {error}
      </Alert>
    );
  }

  function loadData() {
    fetcher({
      limit: limit,
      page: page,
      order_by: orderBy,
      sort: sort,
      search: searchText,
    })
      .then((data) => {
        if (data.length <= 0 || data.length < limit) {
          setHideLoadButton(true);
        } else {
          setHideLoadButton(false);
        }
        setData((old) => [...old, ...data]);
      })
      .catch((err) => setError(err.message));
  }

  function renderLoadMoreButton() {
    if (hideLoadButton) return null;

    return (
      <Stack gap={2} className="col-md-5 mx-auto my-auto mt-3">
        <Button variant="primary" onClick={() => onLoadMore()}>
          Load more
        </Button>
      </Stack>
    );
  }

  function onLoadMore() {
    setPage((old) => old + 1);
  }

  function onSearchPress() {
    setPage(1);
    setData([]);
    loadData();
  }

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <>
      {renderError()}

      <InputGroup className="my-5">
        <Form.Control
          placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearchPress();
          }}
        />
        <Button variant="outline-secondary" onClick={() => onSearchPress()}>
          Search
        </Button>
      </InputGroup>

      <Table striped>
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{internalRenderRow()}</tbody>
      </Table>

      {renderLoadMoreButton()}
    </>
  );
}
