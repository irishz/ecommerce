import React from "react";
import { pdfFromReact } from "generate-pdf-from-react-html";
import { Button } from "react-bootstrap";

function AdminHome() {
    return (
        <div>
            <h1>Example page</h1>
            <div
                className="element-to-print"
            >
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Iste quia dicta itaque sunt fuga, illo ad eaque ea commodi
                    temporibus perferendis provident doloribus non iusto
                    asperiores excepturi autem facere qui!
                </p>
            </div>
            <Button
                variant="primary"
                onClick={() =>
                    pdfFromReact(
                        ".element-to-print",
                        "My-file",
                        "p",
                        true,
                        false
                    )
                }
            >Export</Button>
        </div>
    );
}

export default AdminHome;
