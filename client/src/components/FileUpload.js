import { Button, Loading } from "@nextui-org/react";
import { Fragment, useRef } from "react";

function FileUpload(props) {
  const fileInput = useRef(null);

  function handleClick(event) {
    fileInput.current.click();
  }

  function handleChange(event) {
    const fileUploaded = event.target.files;
    props.onUpload(fileUploaded);
  }

  return (
    <Fragment>
      <Button
        flat
        rounded
        auto
        color="secondary"
        size="sm"
        onClick={handleClick}
        css={{ fontFamily: "Neon" }}
        disabled={props.loading ? true : false}
      >
        {!props.loading ? (
          <Fragment>Upload</Fragment>
        ) : (
          <Loading type="spinner" />
        )}
      </Button>
      <input
        id="file_input"
        className="file_up_input"
        ref={fileInput}
        onChange={handleChange}
        type="file"
      />
    </Fragment>
  );
}

export default FileUpload;
