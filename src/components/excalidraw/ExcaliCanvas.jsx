import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  exportToClipboard,
  Excalidraw,
  useHandleLibrary,
  MIME_TYPES,
  sceneCoordsToViewportCoords,
  viewportCoordsToSceneCoords,
  restoreElements,
  LiveCollaborationTrigger,
  MainMenu,
  Footer,
  Sidebar
} from "@excalidraw/excalidraw";

import initialData from "@/components/excalidraw/initialData";
import CustomFooter from "@/components/excalidraw/CustomFooter";
import MobileFooter from "@/components/excalidraw/MobileFooter";

import { nanoid } from "nanoid";
import {
  resolvablePromise,
  withBatchedUpdates,
  withBatchedUpdatesThrottled,
  distance2d
} from "@/components/excalidraw/utils";

// This is so that we use the bundled excalidraw.development.js file instead
// of the actual source code

const COMMENT_ICON_DIMENSION = 32;
const COMMENT_INPUT_HEIGHT = 50;
const COMMENT_INPUT_WIDTH = 150;

export default function ExcaliCanvas({ width="90vw", height="55vh" }) {
  const appRef = useRef(null);
  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [blobUrl, setBlobUrl] = useState("");
  const [canvasUrl, setCanvasUrl] = useState("");
  const [exportWithDarkMode, setExportWithDarkMode] = useState(false);
  const [exportEmbedScene, setExportEmbedScene] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [commentIcons, setCommentIcons] = useState({});
  const [comment, setComment] = useState(null);

  const initialStatePromiseRef = useRef({ promise: null });
  if (!initialStatePromiseRef.current.promise) {
    initialStatePromiseRef.current.promise = resolvablePromise();
  }

  const [
    excalidrawAPI,
    setExcalidrawAPI
  ] = useState(null);

  useHandleLibrary({ excalidrawAPI });

  useEffect(() => {
    if (!excalidrawAPI) {
      return;
    }
    const fetchData = async () => {
      const res = await fetch("/rocket.jpeg");
      const imageData = await res.blob();
      const reader = new FileReader();
      reader.readAsDataURL(imageData);

      reader.onload = function () {
        const imagesArray = [
          {
            id: "rocket",
            dataURL: reader.result,
            mimeType: MIME_TYPES.jpg,
            created: 1644915140367,
            lastRetrieved: 1644915140367
          }
        ];

        //@ts-ignore
        initialStatePromiseRef.current.promise.resolve(initialData);
        excalidrawAPI.addFiles(imagesArray);
      };
    };
    fetchData();
  }, [excalidrawAPI]);

  const renderTopRightUI = (isMobile) => {
    return (
      <>
        {!isMobile && (
          <LiveCollaborationTrigger
            isCollaborating={isCollaborating}
            onSelect={() => {
              window.alert("Collab dialog clicked");
            }}
          />
        )}
        <button
          onClick={() => alert("This is dummy top right UI")}
          style={{ height: "2.5rem" }}
        >
          {" "}
          Click me{" "}
        </button>
      </>
    );
  };

  const updateScene = () => {
    const sceneData = {
      elements: restoreElements(
        [
          {
            type: "rectangle",
            version: 141,
            versionNonce: 361174001,
            isDeleted: false,
            id: "oDVXy8D6rom3H1-LLH2-f",
            fillStyle: "hachure",
            strokeWidth: 1,
            strokeStyle: "solid",
            roughness: 1,
            opacity: 100,
            angle: 0,
            x: 100.50390625,
            y: 93.67578125,
            strokeColor: "#c92a2a",
            backgroundColor: "transparent",
            width: 186.47265625,
            height: 141.9765625,
            seed: 1968410350,
            groupIds: [],
            boundElements: null,
            locked: false,
            link: null,
            updated: 1,
            roundness: {
              type: 3,
              value: 32
            }
          }
        ],
        null
      ),
      appState: {
        viewBackgroundColor: "#edf2ff"
      }
    };
    excalidrawAPI?.updateScene(sceneData);
  };

  const onLinkOpen = useCallback(
    (
      element,
      event
    ) => {
      const link = element.link;
      const { nativeEvent } = event.detail;
      const isNewTab = nativeEvent.ctrlKey || nativeEvent.metaKey;
      const isNewWindow = nativeEvent.shiftKey;
      const isInternalLink =
        link.startsWith("/") || link.includes(window.location.origin);
      if (isInternalLink && !isNewTab && !isNewWindow) {
        // signal that we're handling the redirect ourselves
        event.preventDefault();
        // do a custom redirect, such as passing to react-router
        // ...
      }
    },
    []
  );

  const onCopy = async (type) => {
    if (!excalidrawAPI) {
      return false;
    }
    await exportToClipboard({
      elements: excalidrawAPI.getSceneElements(),
      appState: excalidrawAPI.getAppState(),
      files: excalidrawAPI.getFiles(),
      type
    });
    window.alert(`Copied to clipboard as ${type} successfully`);
  };

  const [pointerData, setPointerData] = useState(null);

  const onPointerDown = (
    activeTool,
    pointerDownState
  ) => {
    if (activeTool.type === "custom" && activeTool.customType === "comment") {
      const { x, y } = pointerDownState.origin;
      setComment({ x, y, value: "" });
    }
  };

  const rerenderCommentIcons = () => {
    if (!excalidrawAPI) {
      return false;
    }
    const commentIconsElements = appRef.current.querySelectorAll(
      ".comment-icon"
    );
    commentIconsElements.forEach((ele) => {
      const id = ele.id;
      const appstate = excalidrawAPI.getAppState();
      const { x, y } = sceneCoordsToViewportCoords(
        { sceneX: commentIcons[id].x, sceneY: commentIcons[id].y },
        appstate
      );
      ele.style.left = `${
        x - COMMENT_ICON_DIMENSION / 2 - appstate.offsetLeft
      }px`;
      ele.style.top = `${
        y - COMMENT_ICON_DIMENSION / 2 - appstate.offsetTop
      }px`;
    });
  };

  const onPointerMoveFromPointerDownHandler = (
    pointerDownState
  ) => {
    return withBatchedUpdatesThrottled((event) => {
      if (!excalidrawAPI) {
        return false;
      }
      const { x, y } = viewportCoordsToSceneCoords(
        {
          clientX: event.clientX - pointerDownState.hitElementOffsets.x,
          clientY: event.clientY - pointerDownState.hitElementOffsets.y
        },
        excalidrawAPI.getAppState()
      );
      setCommentIcons({
        ...commentIcons,
        [pointerDownState.hitElement.id]: {
          ...commentIcons[pointerDownState.hitElement.id],
          x,
          y
        }
      });
    });
  };
  const onPointerUpFromPointerDownHandler = (
    pointerDownState
  ) => {
    return withBatchedUpdates((event) => {
      window.removeEventListener("pointermove", pointerDownState.onMove);
      window.removeEventListener("pointerup", pointerDownState.onUp);
      excalidrawAPI?.setActiveTool({ type: "selection" });
      const distance = distance2d(
        pointerDownState.x,
        pointerDownState.y,
        event.clientX,
        event.clientY
      );
      if (distance === 0) {
        if (!comment) {
          setComment({
            x: pointerDownState.hitElement.x + 60,
            y: pointerDownState.hitElement.y,
            value: pointerDownState.hitElement.value,
            id: pointerDownState.hitElement.id
          });
        } else {
          setComment(null);
        }
      }
    });
  };
  const saveComment = () => {
    if (!comment) {
      return;
    }
    if (!comment.id && !comment.value) {
      setComment(null);
      return;
    }
    const id = comment.id || nanoid();
    setCommentIcons({
      ...commentIcons,
      [id]: {
        x: comment.id ? comment.x - 60 : comment.x,
        y: comment.y,
        id,
        value: comment.value
      }
    });
    setComment(null);
  };

  const renderCommentIcons = () => {
    return Object.values(commentIcons).map((commentIcon) => {
      if (!excalidrawAPI) {
        return false;
      }
      const appState = excalidrawAPI.getAppState();
      const { x, y } = sceneCoordsToViewportCoords(
        { sceneX: commentIcon.x, sceneY: commentIcon.y },
        excalidrawAPI.getAppState()
      );
      return (
        <div
          id={commentIcon.id}
          key={commentIcon.id}
          style={{
            top: `${y - COMMENT_ICON_DIMENSION / 2 - appState.offsetTop}px`,
            left: `${x - COMMENT_ICON_DIMENSION / 2 - appState.offsetLeft}px`,
            position: "absolute",
            zIndex: 1,
            width: `${COMMENT_ICON_DIMENSION}px`,
            height: `${COMMENT_ICON_DIMENSION}px`,
            cursor: "pointer",
            touchAction: "none"
          }}
          className="comment-icon"
          onPointerDown={(event) => {
            event.preventDefault();
            if (comment) {
              commentIcon.value = comment.value;
              saveComment();
            }
            const pointerDownState = {
              x: event.clientX,
              y: event.clientY,
              hitElement: commentIcon,
              hitElementOffsets: { x: event.clientX - x, y: event.clientY - y }
            };
            const onPointerMove = onPointerMoveFromPointerDownHandler(
              pointerDownState
            );
            const onPointerUp = onPointerUpFromPointerDownHandler(
              pointerDownState
            );
            window.addEventListener("pointermove", onPointerMove);
            window.addEventListener("pointerup", onPointerUp);

            pointerDownState.onMove = onPointerMove;
            pointerDownState.onUp = onPointerUp;

            excalidrawAPI?.setActiveTool({
              type: "custom",
              customType: "comment"
            });
          }}
        >
          <div className="comment-avatar">
            <img src="doremon.png" alt="doremon" />
          </div>
        </div>
      );
    });
  };

  const renderComment = () => {
    if (!comment) {
      return null;
    }
    const appState = excalidrawAPI?.getAppState();
    const { x, y } = sceneCoordsToViewportCoords(
      { sceneX: comment.x, sceneY: comment.y },
      appState
    );
    let top = y - COMMENT_ICON_DIMENSION / 2 - appState.offsetTop;
    let left = x - COMMENT_ICON_DIMENSION / 2 - appState.offsetLeft;

    if (
      top + COMMENT_INPUT_HEIGHT <
      appState.offsetTop + COMMENT_INPUT_HEIGHT
    ) {
      top = COMMENT_ICON_DIMENSION / 2;
    }
    if (top + COMMENT_INPUT_HEIGHT > appState.height) {
      top = appState.height - COMMENT_INPUT_HEIGHT - COMMENT_ICON_DIMENSION / 2;
    }
    if (
      left + COMMENT_INPUT_WIDTH <
      appState.offsetLeft + COMMENT_INPUT_WIDTH
    ) {
      left = COMMENT_ICON_DIMENSION / 2;
    }
    if (left + COMMENT_INPUT_WIDTH > appState.width) {
      left = appState.width - COMMENT_INPUT_WIDTH - COMMENT_ICON_DIMENSION / 2;
    }

    return (
      <textarea
        className="comment"
        style={{
          top: `${top}px`,
          left: `${left}px`,
          position: "absolute",
          zIndex: 1,
          height: `${COMMENT_INPUT_HEIGHT}px`,
          width: `${COMMENT_INPUT_WIDTH}px`
        }}
        ref={(ref) => {
          setTimeout(() => ref?.focus());
        }}
        placeholder={comment.value ? "Reply" : "Comment"}
        value={comment.value}
        onChange={(event) => {
          setComment({ ...comment, value: event.target.value });
        }}
        onBlur={saveComment}
        onKeyDown={(event) => {
          if (!event.shiftKey && event.key === "Enter") {
            event.preventDefault();
            saveComment();
          }
        }}
      />
    );
  };
  const renderSidebar = () => {
    return (
      <Sidebar>
        <Sidebar.Header>Custom header!</Sidebar.Header>
        Custom sidebar!
      </Sidebar>
    );
  };
  const renderMenu = () => {
    return (
      <MainMenu>
        <MainMenu.DefaultItems.SaveAsImage />
        <MainMenu.DefaultItems.Export />
        <MainMenu.Separator />
        <MainMenu.DefaultItems.LiveCollaborationTrigger
          isCollaborating={isCollaborating}
          onSelect={() => window.alert("You clicked on collab button")}
        />
        <MainMenu.Group title="Excalidraw links">
          <MainMenu.DefaultItems.Socials />
        </MainMenu.Group>
        <MainMenu.Separator />
        <MainMenu.ItemCustom>
          <button
            style={{ height: "2rem" }}
            onClick={() => window.alert("custom menu item")}
          >
            custom item
          </button>
        </MainMenu.ItemCustom>
        <MainMenu.DefaultItems.Help />

        {excalidrawAPI && <MobileFooter excalidrawAPI={excalidrawAPI} />}
      </MainMenu>
    );
  };
  return (
    <div className="App" ref={appRef}>
        <div className={`excalidraw-wrapper w-[${width}] h-[${height}]`} style={{width: width, height: height}}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "20px",
              display: "flex",
              padding: "5px 10px",
              transform: "translateX(-50%)",
              background: "rgba(255, 255, 255, 0.8)",
              gap: "1rem"
            }}
          >
            <button onClick={() => excalidrawAPI?.toggleMenu("customSidebar")}>
              Toggle Custom Sidebar
            </button>
          </div>
          <Excalidraw
            excalidrawAPI={(api) => setExcalidrawAPI(api)}
            initialData={initialStatePromiseRef.current.promise}
            onChange={(elements, state) => {
              console.info("Elements :", elements, "State : ", state);
            }}
            onPointerUpdate={(payload) => setPointerData(payload)}
            viewModeEnabled={viewModeEnabled}
            zenModeEnabled={zenModeEnabled}
            gridModeEnabled={gridModeEnabled}
            theme={theme}
            name="Custom name of drawing"
            UIOptions={{
              canvasActions: { loadScene: false }
            }}
            renderTopRightUI={renderTopRightUI}
            onLinkOpen={onLinkOpen}
            onPointerDown={onPointerDown}
            onScrollChange={rerenderCommentIcons}
            renderSidebar={renderSidebar}
          >
            {excalidrawAPI && (
              <Footer>
                <CustomFooter excalidrawAPI={excalidrawAPI} />
              </Footer>
            )}
            {renderMenu()}
          </Excalidraw>
          {Object.keys(commentIcons || []).length > 0 && renderCommentIcons()}
          {comment && renderComment()}
        </div>
    </div>
  );
}
