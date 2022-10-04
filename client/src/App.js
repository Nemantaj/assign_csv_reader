import { useState, useEffect, useRef } from "react";
import { Text, Button, Card, Divider, Table, Input } from "@nextui-org/react";

import FileUpload from "./components/FileUpload";
import TableComponent from "./components/Table";

import "./App.css";

const App = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [parsed, setParsed] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [searchData, setSearchData] = useState(null);

  const inputRef = useRef();

  const fileHandler = (file) => {
    if (file[0].type === "text/csv") {
      setCsvFile(file[0]);
    }
    return;
  };

  useEffect(() => {
    if (csvFile !== null) {
      setLoading(true);
      const formData = new FormData();
      formData.append("csv", csvFile);

      for (var key of formData.entries()) {
        console.log(key[0] + " " + key[1]);
      }

      fetch(`http://localhost:3001/parse`, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("There was an error!");
          }
          return res.json();
        })
        .then((data) => {
          if (!data.parsedCsv) {
            throw new Error("There was an error!");
          }
          console.log(data.parsedCsv);
          setParsed(data.parsedCsv);
          setTableLoading(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }

    if (parsed.length > 0) {
      setTableLoading(false);
    } else {
      setTableLoading(true);
    }
  }, [csvFile]);

  const searchById = (id) => {
    let searchQuery;
    const searchIndex = parsed.findIndex((doc) => {
      return doc.id === id;
    });
    if (searchIndex >= 0) {
      searchQuery = parsed[searchIndex];
      console.log(searchQuery);
    }
    if (!searchQuery) {
      setSearchError(true);
    } else {
      setSearchError(false);
      setSearchData(searchQuery);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <Text css={{ fontFamily: "Neon" }}>CSV READER</Text>
        <FileUpload onUpload={fileHandler} loading={loading} />
      </div>
      <Divider />
      <div className="table_div">
        <div className="panel_holder">
          <Card variant="bordered">
            <Card.Header
              css={{ mt: "10px", display: "inline-flex", gap: "5px" }}
            >
              <Input
                type="number"
                bordered
                size="sm"
                placeholder={
                  searchError ? "Used Id not found!!" : "Search by user Id"
                }
                css={{ fontFamily: "Neon", w: "80%" }}
                aria-label="Search"
                rounded
                ref={inputRef}
                color={searchError ? "error" : "default"}
              />
              <Button
                size="sm"
                rounded
                flat
                auto
                color="error"
                css={{ fontFamily: "Neon" }}
                onClick={() => searchById(inputRef.current.value)}
              >
                Search
              </Button>
            </Card.Header>
            <Divider />
            <Card.Body css={{ my: "5px" }}>
              {searchData !== null &&
                Object.keys(searchData).map((doc, index) => {
                  return (
                    <div className="details">
                      <Text
                        color="$pink800"
                        size="13px"
                        css={{ fontFamily: "Neon" }}
                      >
                        {doc}
                      </Text>
                      <Text
                        color="$pink800"
                        size="13px"
                        css={{ fontFamily: "Neon3" }}
                      >
                        {searchData[doc]}
                      </Text>
                    </div>
                  );
                })}
            </Card.Body>
          </Card>
        </div>
        {parsed.length > 0 && (
          <div className="table_holder">
            <TableComponent
              parsed={parsed}
              setParsed={setParsed}
              tableLoading={tableLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
