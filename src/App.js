import { useEffect, useState, useRef } from "react";
import "./App.css";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import FolderTree from "react-folder-tree";
import FolderLogo from "./assets/folder.png";
import FolderOpenLogo from "./assets/open-folder.png";
import htmlLogo from "./assets/html.png";
import excelLogo from "./assets/excel.png";
import jsLogo from "./assets/js.png";
import cssLogo from "./assets/css-3.png";
import svgLogo from "./assets/svg-file.png";
import scssLogo from "./assets/sass.png";
import pdfLogo from "./assets/pdf.png";
import imageLogo from "./assets/photo.png";
import gifLogo from "./assets/gif.png";
import txtLogo from "./assets/txt.png";
import wordLogo from "./assets/word.png";
import zipLogo from "./assets/zip.png";
import infoLogo from "./assets/info.png";
import jsonLogo from "./assets/json.png";
import gitLogo from "./assets/git.png";
import videoLogo from "./assets/video.png";
import favLogo from "./assets/star.png";
import reactLogo from "./assets/physics.png";
import { BsArrowLeft } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

function App() {
  const dropRef = useRef();

  const [zipFileData, setZipFileData] = useState(undefined);
  const [treePathArr, setTreepathArr] = useState([]);
  const [dropEvent, setDropEvent] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const FileIcons = ({ name }) => {
    let extensionType = name.split(".").splice(-1).toString();

    if (extensionType == "html") {
      return (
        <img src={htmlLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (extensionType == "css" || name.includes(".css.map")) {
      return (
        <img src={cssLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (
      extensionType == "js" ||
      extensionType == "js" ||
      name.includes(".js.map")
    ) {
      return (
        <img src={jsLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (extensionType == "pdf") {
      return (
        <img src={pdfLogo} height="17px" width="17px" className="file-icon" />
      );
    } else if (extensionType == "svg") {
      return (
        <img src={svgLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (extensionType == "xlsx") {
      return (
        <img src={excelLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (extensionType == "xlsx") {
      return (
        <img src={excelLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (extensionType == "scss") {
      return (
        <img src={scssLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (
      extensionType == "png" ||
      extensionType == "jpeg" ||
      extensionType == "jpg" ||
      extensionType == "webp"
    ) {
      return (
        <img src={imageLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (extensionType == "gif") {
      return (
        <img src={gifLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (extensionType == "txt") {
      return (
        <img src={txtLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (extensionType == "docx") {
      return (
        <img src={wordLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (extensionType == "zip") {
      return (
        <img src={zipLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (extensionType == "md") {
      return (
        <img src={infoLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (extensionType == "json") {
      return (
        <img src={jsonLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (name == ".gitignore") {
      return (
        <img src={gitLogo} height="18px" width="18px" className="file-icon" />
      );
    } else if (
      extensionType == "mp4" ||
      extensionType == "mov" ||
      extensionType == "wmv" ||
      extensionType == "avi" ||
      extensionType == "avchd" ||
      extensionType == "mkv" ||
      extensionType == "webm"
    ) {
      return (
        <img src={videoLogo} height="14px" width="14px" className="file-icon" />
      );
    } else if (extensionType == "ico") {
      return (
        <img src={favLogo} height="17px" width="17px" className="file-icon" />
      );
    } else if (extensionType == "jsx") {
      return (
        <img src={reactLogo} height="17px" width="17px" className="file-icon" />
      );
    } else {
      return (
        <img src={txtLogo} height="14px" width="14px" className="file-icon" />
      );
    }
  };

  function treeFunc(treeArr, fileData) {
    let result = [];
    let level = { result };

    treeArr.forEach((path, ind) => {
      path.split("/").reduce((r, name, i, a) => {
        if (!r[name]) {
          r[name] = { result: [] };

          if (name !== "") {
            r.result.push({
              name,
              url: treeArr[ind],
              children: r[name].result,
              dir: r[name].result,
            });
          }
        }

        return r[name];
      }, level);
    });

    result = {
      name: fileData.name,
      children: result,
      dir: result,
    };

    setTreepathArr(result);
  }

  const fileupload = async (e) => {
    let arr = [];

    let fileDatas = e.target.files[0];

    if (fileDatas !== undefined) {
      if (fileDatas.type == "application/x-zip-compressed" ||  fileDatas.type == "application/zip") {
        await JSZip.loadAsync(fileDatas, { base64: true }).then(function (zip) {
          setZipFileData(fileDatas);

          Object.keys(zip.files).forEach(function (key, index) {
            arr.push(key);
          });
          treeFunc(arr, fileDatas);
        });        
      } else {
        setErrorMsg(true);       
      }
    }
  };

  const onNameClick = async ({ defaultOnClick, nodeData }) => {
    defaultOnClick();
    const { url, dir, name } = nodeData;

    if (dir.length == 0) {
      let fileName = url.split("/").splice(-1).toString();

      await JSZip.loadAsync(zipFileData).then(function (content) {
          return content.files[url.toString()].async("uint8array");
      }).then(function (fileContent) {
          saveAs(new Blob([fileContent]), fileName);
      });
    }
  };

  const FolderIcon = ({ onClick: defaultOnClick, nodeData }) => {
    const { path, name, dir, checked, isOpen, ...restData } = nodeData;
    const handleClick = () => {
      defaultOnClick();
    };

    return dir.length == 0 ? (
      <FileIcons name={name} />
    ) : (
      <img
        src={
          name.split(".").splice(-1).toString() == "zip" ? zipLogo : FolderLogo
        }
        height="16px"
        width="16px"
        style={{ marginBottom: "-2px", marginLeft: "2px" }}
        onClick={handleClick}
      />
    );
  };

  const FolderOpenIcon = ({ onClick: defaultOnClick, nodeData }) => {
    const { path, name, dir, checked, isOpen, ...restData } = nodeData;
    const handleClick = () => {
      defaultOnClick();
    };

    return dir.length == 0 ? (
      <FileIcons name={name} />
    ) : (
      <img
        src={
          name.split(".").splice(-1).toString() == "zip"
            ? zipLogo
            : FolderOpenLogo
        }
        height="18px"
        width="18px"
        style={{ marginBottom: "-2px", marginLeft: "2px" }}
        onClick={handleClick}
      />
    );
  };

  const CaretRightIcon = ({ onClick: defaultOnClick, nodeData }) => {
    const { path, name, dir, checked, isOpen, ...restData } = nodeData;
    const handleClick = () => {
      defaultOnClick();
    };

    return dir.length == 0 ? (
      <section className="arrow-icon"></section>
    ) : (
      <span onClick={handleClick}>
        <span className="arrow-icon">
          <MdKeyboardArrowRight />
        </span>
      </span>
    );
  };

  const CaretDownIcon = ({ onClick: defaultOnClick, nodeData }) => {
    const { path, name, dir, checked, isOpen, ...restData } = nodeData;
    const handleClick = () => {
      defaultOnClick();
    };

    return dir.length == 0 ? (
      <section className="arrow-icon"></section>
    ) : (
      <span onClick={handleClick}>
        <span className="arrow-icon">
          <MdKeyboardArrowDown />
        </span>
      </span>
    );
  };

  const uploadAnotherZip = () => {
    setZipFileData(undefined);
    setTreepathArr([]);
    setErrorMsg(false);
  };

  // useEffect(() => {
  //   const uploadClick = (event) => {
  //     if (dropRef.current && !dropRef.current.contains(event.target)) {
  //     }
  //   };

  //   document.addEventListener("click", uploadClick);

  //   return () => {
  //     document.removeEventListener("click", uploadClick);
  //   };
  // }, []);

  return (
    <div className="App">
      <div className="upload-file-sec">
        <div className="zip-logo-head-sec">
          <img src={zipLogo} className="zip-logo-head" /> <h3>Zip Extractor</h3>
        </div>

        <div className="inner-file-sec">
          {zipFileData !== undefined ? (
            <>
              <div>
                <h3 className="zip-heading">Zip file extracted successfully</h3>
                <p className="zip-heading-para">
                  Click on the files to download it.
                </p>
              </div>
              <div className="file-tree-sec">
                <FolderTree
                  data={treePathArr}
                  showCheckbox={false}
                  onNameClick={onNameClick}
                  initOpenStatus={"closed"}
                  iconComponents={{
                    FolderIcon,
                    FolderOpenIcon,
                    CaretRightIcon,
                    CaretDownIcon,
                  }}
                />
              </div>
              <div className="clear-file-sec">
                <button onClick={uploadAnotherZip} className="clear-file">
                  <BsArrowLeft className="arrow-icon" /> Extract Another Zip
                </button>
              </div>
            </>
          ) : (
            <div className="upload-section">
              <div>
                {errorMsg ? (
                  <span className="error-msg">
                    Only Zip format should be uploaded
                  </span>
                ) : null}
                <label htmlFor="files" className="upload-btn">
                  <div>
                    <div className="file-txt-sec">
                      <span className="file-txt1">Choose File</span>
                      <span className="file-txt2">from your computer</span>
                    </div>
                  </div>
                </label>
              </div>

              <input
                type="file"
                id="files"
                title=" "
                className="file-btn"
                onChange={(e) => fileupload(e)}
                onDrop={(e) => fileupload(e)}
              />

              <p className="or-txt">OR</p>
              <p className="drag-txt">Drag and drop file here...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
