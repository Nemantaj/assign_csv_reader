import { useState, useEffect } from "react";
import { Table, Text } from "@nextui-org/react";

const TableComponent = (props) => {
  const [currentSort, setCurrentSort] = useState({
    field: "id",
    asc: false,
  });

  const applySorting = (field, asc) => {
    setCurrentSort({ field: field, asc: asc });
  };

  useEffect(() => {
    const parsedCopy = [...props.parsed];
    let sortParsed;
    if (currentSort.field === "name") {
      sortParsed = parsedCopy.sort((a, b) => {
        let fa = a.name.toLowerCase();
        let fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    } else if (currentSort.field === "state") {
      sortParsed = parsedCopy.sort((a, b) => {
        let fa = a.state.toLowerCase();
        let fb = b.state.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    } else {
      sortParsed = parsedCopy.sort((a, b) => {
        return a[currentSort.field] - b[currentSort.field];
      });
    }
    props.setParsed(currentSort.asc ? sortParsed : sortParsed.reverse());
  }, [currentSort]);

  return (
    <Table
      aria-label="table"
      css={{ fontFamily: "Neon", textAlign: "start" }}
      bordered
      shadow={false}
      sticked
      striped
      fixed={true}
    >
      <Table.Header>
        <Table.Column key="id">
          <Text
            onClick={() => applySorting("id", !currentSort.asc)}
            size="14px"
            css={{ cursor: "pointer", fontFamily: "Neon" }}
          >
            USERID
          </Text>
        </Table.Column>
        <Table.Column key="name">
          <Text
            onClick={() => applySorting("name", !currentSort.asc)}
            size="14px"
            css={{ cursor: "pointer", fontFamily: "Neon" }}
          >
            Name
          </Text>
        </Table.Column>
        <Table.Column key="age">
          <Text
            onClick={() => applySorting("age", !currentSort.asc)}
            size="14px"
            css={{ cursor: "pointer", fontFamily: "Neon" }}
          >
            Age
          </Text>
        </Table.Column>
        <Table.Column key="state">
          <Text
            onClick={() => applySorting("state", !currentSort.asc)}
            size="14px"
            css={{ cursor: "pointer", fontFamily: "Neon" }}
          >
            State
          </Text>
        </Table.Column>
        <Table.Column key="salty">
          <Text
            onClick={() => applySorting("salty", !currentSort.asc)}
            size="14px"
            css={{ cursor: "pointer", fontFamily: "Neon" }}
          >
            Salty
          </Text>
        </Table.Column>
        <Table.Column key="spicy">
          <Text
            onClick={() => applySorting("spicy", !currentSort.asc)}
            size="14px"
            css={{ cursor: "pointer", fontFamily: "Neon" }}
          >
            Spicy
          </Text>
        </Table.Column>
        <Table.Column key="sweet">
          <Text
            onClick={() => applySorting("sweet", !currentSort.asc)}
            size="14px"
            css={{ cursor: "pointer", fontFamily: "Neon" }}
          >
            Sweet
          </Text>
        </Table.Column>
        <Table.Column key="match">
          <Text
            onClick={() => applySorting("%match", !currentSort.asc)}
            size="14px"
            css={{ cursor: "pointer", fontFamily: "Neon" }}
          >
            %Match
          </Text>
        </Table.Column>
      </Table.Header>
      <Table.Body
        css={{ fontFamily: "Neon3" }}
        items={props.parsed}
        loadingState={props.tableLoading}
      >
        {props.parsed.map((item, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell key="id">{item.id}</Table.Cell>
              <Table.Cell key="name">{item.name}</Table.Cell>
              <Table.Cell key="age">{item.age}</Table.Cell>
              <Table.Cell key="state">{item.state}</Table.Cell>
              <Table.Cell key="salty">{item.salty}</Table.Cell>
              <Table.Cell key="spicy">{item.spicy}</Table.Cell>
              <Table.Cell key="sweet">{item.sweet}</Table.Cell>
              <Table.Cell key="match">{item["%match"]}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default TableComponent;
