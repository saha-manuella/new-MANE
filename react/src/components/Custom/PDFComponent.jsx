import { useState } from "react";
import { Document, Page } from "react-pdf";

const PDFComponent = (props) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex justify-center">
      <Document file={props.pdf} onLoadSuccess={onDocumentLoadSuccess}>
        {/* <Page pageNumber={pageNumber} /> */}

        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                key={page}
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={750}
                scale={props.scale}
                className={"mb-10"}
              />
            );
          })}
      </Document>
      {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}
    </div>
  );
};

export default PDFComponent;
