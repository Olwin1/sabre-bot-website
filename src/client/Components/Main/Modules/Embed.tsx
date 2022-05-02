import e from "express";
import React, { FC, useState, useReducer } from "react";
import { SketchPicker } from "react-color";
import axios from "axios";
import Picker from "emoji-picker-react";
import { getCookie } from "../../../cookie-utils";
import { Store } from 'react-notifications-component';
interface TyProps {
  user: any;
}
type role = {
  id: string;
  name: string;
  permissions: string;
  position: number;
  color: number;
  hoist: boolean;
  managed: boolean;
  mentionable: boolean;
  icon: string;
  unicode_emoji: string;
};
interface emojiEntryProps {
  emoji: string;
  id: string;
  name: string;
  colour: string;
}

interface CardProps {
  data: JSON;
}
interface DropProps {
  iter: string;
  children: JSX.Element;
  name: string;
  isNested: boolean;
}
interface DropWrapperProps {
  iter: string;
  name: string;
}
interface TxtProps {
  isSmall: boolean;
  isLocked: boolean;
}
const Main: FC<TyProps> = (props) => {
  let embedFieldsTitle = [] as string[];
  let embedFields = [] as string[];
  let content = "" as string;
  let author = "" as string;
  let authorHyperlink = "" as string;
  let authorIcon = "" as string;
  let title = "" as string;
  let footer = "" as string;
  let imageURL = "" as string;
  let description = "" as string;
  let titleHyperlink = "" as string;
  let embedColor = "" as string;
  let editLink = "" as string;
  const [editUrlCheck, setEditUrlCheck] = React.useState(false);
  let colour = "#cfcfcf";
  const roles = props.user.roles as role[];
  roles ? roles.shift() : null;

  const Dropdown: FC<DropProps> = (props) => {
    const handleClick2 = () => {
      let element = document.getElementById("accordion-" + props.iter);
      if (element.classList.length == 1) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
      // Do Own Panel
      var panel_parent = document.getElementById(element.nextElementSibling.id);
      if (panel_parent.style.maxHeight) {
        panel_parent.style.maxHeight = null;
      } else {
        panel_parent.style.maxHeight = panel_parent.scrollHeight + "px";

        if (!props.isNested) {
          //Do Rest Of Panels
          var panel = document.getElementById(
            element.parentElement.parentElement.id
          );
          var second = document.getElementById(
            document.getElementById(panel.firstElementChild.id)
              .firstElementChild.nextElementSibling.id
          );
          var third = document.getElementById(
            second.parentElement.nextElementSibling.firstElementChild
              .nextElementSibling.id
          );
          var fourth = document.getElementById(
            third.parentElement.nextElementSibling.firstElementChild
              .nextElementSibling.id
          );
          var fifth = document.getElementById(
            fourth.parentElement.nextElementSibling.firstElementChild
              .nextElementSibling.id
          );
          var sixth = document.getElementById(
            fifth.parentElement.nextElementSibling.firstElementChild
              .nextElementSibling.id
          );
          panel.style.maxHeight =
            panel.scrollHeight +
            second.scrollHeight +
            third.scrollHeight +
            fourth.scrollHeight +
            fifth.scrollHeight +
            sixth.scrollHeight +
            "px";
        } else {
          let panel = document.getElementById(
            "panel-" + props.iter.split("-")[0]
          );
          panel.style.maxHeight = panel.scrollHeight + "px";
          let temp =
            parseInt(panel.style.maxHeight) + panel_parent.scrollHeight;
          panel.style.maxHeight = temp + "px";
        }
      }
    };
    return (
      <div id={"div-" + props.iter}>
        <button
          className="accordion"
          id={"accordion-" + props.iter}
          onClick={() => handleClick2()}
        >
          {props.name}
        </button>
        <div className="panel" id={"panel-" + props.iter}>
          {props.children}
        </div>
      </div>
    );
  };
  const Textbox: FC<TxtProps> = (props) => {
    let classes = "resize general";
    const general = props.isSmall ? " general-2" : "";
    const locked = props.isLocked ? " resize-lock" : "";
    classes += general + locked;
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.id == "author-txt") {
        author = e.target.value;
      } else if (e.target.id == "description-txt") {
        description = e.target.value;
      } else {
        content = e.target.value;
      }
    };

    return (
      <div className="flex">
        <textarea
          className={classes}
          id={props.isSmall ? "author-txt" : "description-txt"}
          onChange={(e) => handleChange(e)}
        />
      </div>
    );
  };
  const Card: FC<CardProps> = (props) => {
    const Textbox = () => {
      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.id == "author-txt") {
          author = e.target.value;
        } else if (e.target.id == "description-txt") {
          description = e.target.value;
        } else {
          content = e.target.value;
        }
      };
      return (
        <div className="flex">
          <textarea
            className="resize general"
            onChange={(e) => handleChange(e)}
          />
        </div>
      );
    };
    return (
      <div className="float-left is-padded">
        <Textbox />
      </div>
    );
  };

  const DropdownWrapper: FC<DropWrapperProps> = (props) => {
    const [authorHyperlinkCheck, setAuthorHyperlinkCheck] =
      React.useState(false);
    const [authorIconCheck, setAuthorIconCheck] = React.useState(false);
    const [bodyHyperlinkCheck, setBodyHyperlinkCheck] = React.useState(false);
    const handleClick = () => {
      let element = document.getElementById("accordion-" + props.iter);
      if (element.classList.length == 1) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }

      var panel = document.getElementById(element.nextElementSibling.id);
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        var second = document.getElementById(
          panel.firstElementChild.firstElementChild.nextElementSibling.id
        );

        var third = document.getElementById(
          second.parentElement.nextElementSibling.firstElementChild
            .nextElementSibling.id
        );
        var fourth = document.getElementById(
          third.parentElement.nextElementSibling.firstElementChild
            .nextElementSibling.id
        );
        var fifth = document.getElementById(
          fourth.parentElement.nextElementSibling.firstElementChild
            .nextElementSibling.id
        );
        var sixth = document.getElementById(
          fifth.parentElement.nextElementSibling.firstElementChild
            .nextElementSibling.id
        );
        panel.style.maxHeight =
          panel.scrollHeight +
          second.scrollHeight +
          third.scrollHeight +
          fourth.scrollHeight +
          fifth.scrollHeight +
          sixth.scrollHeight +
          "px";
      }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.id == "author") {
        author = e.target.value;
      } else if (e.target.id == "authorHyper") {
        authorHyperlink = e.target.value;
        let url: URL;
        try {
          url = new URL(authorHyperlink);
          setAuthorHyperlinkCheck(false);
        } catch (_) {
          if (authorHyperlink != "") {
            setAuthorHyperlinkCheck(true);
          } else {
            setAuthorHyperlinkCheck(false);
          }
        }
      } else if (e.target.id == "authorIcon") {
        authorIcon = e.target.value;
        let url: URL;
        try {
          url = new URL(authorIcon);
          setAuthorIconCheck(false);
        } catch (_) {
          if (authorIcon != "") {
            setAuthorIconCheck(true);
          } else {
            setAuthorIconCheck(false);
          }
        }
      } else if (e.target.id == "title") {
        title = e.target.value;
      } else if (e.target.id == "footer") {
        footer = e.target.value;
      } else if (e.target.id == "imageURL") {
        imageURL = e.target.value;
      } else if (e.target.id == "hyperlink") {
        titleHyperlink = e.target.value;
        let url: URL;
        try {
          url = new URL(titleHyperlink);
          setBodyHyperlinkCheck(false);
        } catch (_) {
          if (titleHyperlink != "") {
            setBodyHyperlinkCheck(true);
          } else {
            setBodyHyperlinkCheck(false);
          }
        }
      }
    };

    const ColorPicker = () => {
      const [embedColour, setEmbedColour] = React.useState(colour);
      const [embedColourVisible, setEmbedColourVisible] = React.useState(false);

      const handleColourChange = (color: any) => {
        setEmbedColour(color.hex);
        document.getElementById("colourChange").style.borderColor = color.hex;
        //@ts-ignore: Property Does Not Exist.
        document.getElementById("embedColour").value = color.hex;
        embedColor = color.hex;
      };
      const handleClickOutside = (event: any) => {
        const inside = event
          .composedPath()
          .includes(document.getElementById("colorPickerWrapper"));
        if (!inside) {
          document.removeEventListener("mousedown", handleClickOutside);

          if (event.target.id != "embedColour") {
            setEmbedColourVisible(false);
          }
        }
      };
      const handleToggleClick = () => {
        console.log(1);

        if (!embedColourVisible) {
          document.addEventListener("mousedown", handleClickOutside);
          setEmbedColourVisible(true);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
          setEmbedColourVisible(false);
        }
      };
      return (
        <div>
          <input
            className="input-embed"
            id="embedColour"
            onClick={() => handleToggleClick()}
            readOnly={true}
          />
          <div
            id="colorPickerWrapper"
            style={{
              visibility: embedColourVisible ? "visible" : "hidden",
              position: "absolute",
            }}
          >
            <SketchPicker
              color={embedColour}
              onChange={(c: any) => handleColourChange(c)}
            />
          </div>
        </div>
      );
    };

    const EmojiBody = () => {
      const EmojiBodyInner = () => {
        const [listEmojis, setListEmojis] = React.useState(null);

        const EmojiSelector = () => {
          let currentRole: string;
          const Roles = () => {
            currentRole = roles[0].id;
            return (
              <div className="float-right is-padded">
                <div className="select is-primary is-rounded">
                  <select
                    onChange={(e) =>
                      (currentRole = e.target.selectedOptions[0].value)
                    }
                  >
                    {roles.map((role: role) => (
                      <option
                        style={{
                          color:
                            role.color != 0
                              ? "#" + role.color.toString(16)
                              : "#cfcfcf",
                        }}
                        value={role.id}
                        key={role.id}
                        key-id={role.id}
                      >
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          };
          let chosenEmojii: any;
          const PickerInner = () => {
            const [chosenEmoji, setChosenEmoji] = React.useState(null);
            const onEmojiClick = (event: any, emojiObject: any) => {
              setChosenEmoji(emojiObject);
              chosenEmojii = emojiObject;
            };
            return (
              <div>
                {chosenEmoji ? (
                  <span>You chose: {chosenEmoji.emoji}</span>
                ) : (
                  <span>No emoji Chosen</span>
                )}
                <Picker
                  onEmojiClick={
                    onEmojiClick
                  } /*pickerStyle={{ width: '100%' }}*/
                />
              </div>
            );
          };
          const handleReactionAdd = () => {
            listEmojis
              ? console.log(
                  "|| " +
                    chosenEmojii +
                    " || " +
                    currentRole +
                    " || EMOJI: " +
                    listEmojis.some(
                      (item: any) => item.e.emoji == chosenEmojii.emoji
                    ) +
                    "and ROLE: " +
                    listEmojis.some((item: any) => item.r.id == currentRole)
                )
              : null;
            if (currentRole) {
              if (chosenEmojii) {
              if (listEmojis) {
                if (
                  !listEmojis.some(
                    (item: any) => item.e.emoji == chosenEmojii.emoji
                  )
                ) {
                  console.log("emoji check passewd : " + currentRole);
                  if (!listEmojis.some((item: any) => item.r.id == currentRole)) {
                    console.log("role check pased");
                    let tmp = listEmojis;
                    const found = roles.find(element => element.id == currentRole);
                    setListEmojis((emojis: any) => [
                      ...emojis,
                      { e: chosenEmojii, r: found },
                    ]);
                  }
                  else {
                    Store.addNotification({
                      title: "Error",
                      message: "You cannot assign a role twice",
                      type: "danger",
                      insert: "top",
                      container: "top-center",
                      animationIn: ["animate__animated", "animate__fadeIn"],
                      animationOut: ["animate__animated", "animate__fadeOut"],
                      dismiss: {
                        duration: 5000,
                        onScreen: true
                      }
                    });
                  }
                }
                else {
                  Store.addNotification({
                  title: "Error",
                  message: "You cannot use an emoji twice",
                  type: "danger",
                  insert: "top",
                  container: "top-center",
                  animationIn: ["animate__animated", "animate__fadeIn"],
                  animationOut: ["animate__animated", "animate__fadeOut"],
                  dismiss: {
                    duration: 5000,
                    onScreen: true
                  }
                });}
              } else {
                const found = roles.find(element => element.id == currentRole);
                setListEmojis([{ e: chosenEmojii, r: found }]);
              }
            }
            else {
              Store.addNotification({
                title: "Error",
                message: "You need to select an emoji",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              });
            }
          }
          else {
            Store.addNotification({
              title: "Error",
              message: "You need to assign a role",
              type: "danger",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true
              }
            });
          }
          };
          return (
            <div>
              <br />
              <p>Add Reaction</p>
              {roles ? <Roles /> : ""}
              <PickerInner />

              <button
                className="button is-primary"
                onClick={() => handleReactionAdd()}
              >
                Add Reaction
              </button>
            </div>
          );
        };
        const EmojiEntry: FC<emojiEntryProps> = (props) => {
          return (
            <div className="emojiEntry" id={props.id}>
              <div className="inline-flex">
                <div className="no-right-padding">
                  <p>{props.emoji}</p>
                </div>
                <div className="emojiText">
                  <p className="emojiTextP" style={{color:props.colour}}>{props.name}</p>
                </div>
              </div>
            </div>
          );
        };
        return (
          <div className="columns">
            <EmojiSelector />

            <div className="column">
              <br />
              <br />
              {listEmojis
                ? listEmojis.map((emoji: any) => (
                    <EmojiEntry id={emoji.r.id} name={emoji.r.name} colour={emoji.r.color?"#" + emoji.r.color.toString(16):"#cfcfcf"} emoji={emoji.e.emoji}/>
                  ))
                : null}
            </div>
          </div>
        );
      };
      return <EmojiBodyInner />;
    };

    return (
      <div className="embed-preview" id="colourChange">
        <button
          className="accordion"
          id={"accordion-" + props.iter}
          onClick={() => handleClick()}
        >
          {props.name}
        </button>
        <div className="panel" id={"panel-" + props.iter}>
          {/*Here Is The Main Part*/}
          <Dropdown iter="1" name="Author" isNested={false}>
            <div>
              <p>Author</p>
              <Textbox isSmall={true} isLocked={true}></Textbox>
              <div className="columns">
                <div className="column">
                  <p>Author Hyperlink</p>
                  <input
                    className="input-embed"
                    id="authorHyper"
                    onChange={(e) => handleChange(e)}
                  />
                  <span
                    className="erroneousInput"
                    style={{
                      visibility: authorHyperlinkCheck ? "visible" : "hidden",
                    }}
                  >
                    Eroor
                  </span>
                </div>
                <div className="column">
                  <p>Author Icon URL</p>
                  <input
                    className="input-embed"
                    id="authorIcon"
                    onChange={(e) => handleChange(e)}
                  />
                  <span
                    className="erroneousInput"
                    style={{
                      visibility: authorIconCheck ? "visible" : "hidden",
                    }}
                  >
                    Eroor
                  </span>
                </div>
              </div>
            </div>
          </Dropdown>
          <Dropdown iter="2" name="Body" isNested={false}>
            <div>
              <p>Title</p>
              <input
                className="input-embed"
                id="title"
                onChange={(e) => handleChange(e)}
              />
              <p>Description</p>
              <Textbox isSmall={false} isLocked={true}></Textbox>
              <div className="columns">
                <div className="column">
                  <p>Hyperlink</p>
                  <input
                    className="input-embed"
                    id="hyperlink"
                    onChange={(e) => handleChange(e)}
                  />
                  <span
                    className="erroneousInput"
                    style={{
                      visibility: bodyHyperlinkCheck ? "visible" : "hidden",
                    }}
                  >
                    Eroor
                  </span>
                </div>
                <div className="column">
                  <p>Embed Colour</p>

                  <ColorPicker />
                </div>
              </div>
            </div>
          </Dropdown>
          <Dropdown iter="3" name="Fields" isNested={false}>
            <Fields />
          </Dropdown>
          <Dropdown iter="4" name="Images" isNested={false}>
            <div>
              <p>Image URL</p>{" "}
              <input
                className="input-embed"
                onChange={(e) => handleChange(e)}
                id="imageURL"
              />
            </div>
          </Dropdown>
          <Dropdown iter="5" name="Footer" isNested={false}>
            <div>
              <p>Footer</p>{" "}
              <input
                className="input-embed"
                onChange={(e) => handleChange(e)}
                id="footer"
              />
            </div>
          </Dropdown>
          <Dropdown iter="6" name="Reaction Roles" isNested={false}>
            <EmojiBody />
          </Dropdown>
        </div>
      </div>
    );
  };
  const Fields = () => {
    const [fields, setFields] = useState([{ name: "Field 1", iter: "3-1" }]);
    const listItems = fields.map((field) => (
      <Dropdown
        iter={field.iter}
        name={field.name}
        isNested={true}
        key={field.iter}
      >
        <div>
          <p>Field Name</p>
          <input
            className="input-embed"
            onChange={(e) => handleChange(e, true)}
            id={field.iter}
          />
          <p>Field Value</p>
          <input
            className="input-embed"
            onChange={(e) => handleChange(e, false)}
            id={field.iter + "-desc"}
          />
        </div>
      </Dropdown>
    ));
    const handleChange = (e: any, isTitle: boolean) => {
      let id = e.target.id;
      id = id.split("-")[1];
      id = parseInt(id);
      if (isTitle) {
        embedFieldsTitle[id - 1] = e.target.value;
      } else {
        embedFields[id - 1] = e.target.value;
      }
    };
    const addField = () => {
      const count = fields.length + 1;
      let f = { name: "Field " + count, iter: "3-" + count };
      setFields([...fields, f]);
      let element = document.getElementById("accordion-3");
      let panel_parent = document.getElementById(element.nextElementSibling.id);
      let panel = document.getElementById("panel-3");
      panel.style.maxHeight = panel.scrollHeight + "px";
      let temp = parseInt(panel.style.maxHeight) + panel_parent.scrollHeight;
      panel.style.maxHeight = temp + "px";

      let panel2 = document.getElementById("panel-1001");
      let temp2 = parseInt(panel2.style.maxHeight) + panel_parent.scrollHeight;
      panel2.style.maxHeight = temp2 + "px";
    };

    return (
      <div>
        {listItems}
        <button className="button is-primary" onClick={() => addField()}>
          Add Field
        </button>
      </div>
    );
  };
  const sendData = () => {
    console.log("fuck");
    let btn = document.getElementById("sendData");
    let spinner = document.getElementById("sendDataSpinner");
    // @ts-ignore: Unknown Property Error
    btn.disabled = true;
    const embedJSON = {
      title: title,
      url: titleHyperlink,
      desc: description,
      a_url: authorHyperlink,
      a_ico: authorIcon,
      a: author,
      colour: embedColor,
      footer: footer,
      img: imageURL,
      edit: editLink,
      fields: embedFields,
      fields_t: embedFieldsTitle,
      content: content,
    };
    console.log(embedJSON);
    axios
      .post("http://localhost:3000/api/embed", embedJSON, {
        headers: { token: "Bearer " + getCookie("token") },
      })
      .then((resu) => {
        console.log(`statusCode: ${resu.status}`);
        //console.log(resu);
        console.log(resu);
      })
      .catch((error) => {
        console.error(error);
      });
    spinner.style.visibility = "visible";
    setTimeout(() => {
      // @ts-ignore: Unknown Property Error
      btn.disabled = false;
      spinner.style.visibility = "hidden";
    }, 3000);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editLink = e.target.value;
    let url: URL;
    try {
      url = new URL(editLink);
      setEditUrlCheck(false);
    } catch (_) {
      if (editLink != "") {
        setEditUrlCheck(true);
      } else {
        setEditUrlCheck(false);
      }
    }
  };

  return (
    <div>
      <h1 className="title is-4">Create Message</h1>
      <div className="is-card">
        <p>Content</p>
        <Card data={props.user} />
        <br />
        <br />
        <br />
        <br />
        <DropdownWrapper iter="1001" name="Embed"></DropdownWrapper>
        <br />
        <br />
        <p className="edit-link">Message Link</p>
        <input
          className="edit-input input-embed"
          placeholder="https://discord.com/channels/..."
          onChange={(e) => handleChange(e)}
        />
        <span
          className="erroneousInput"
          style={{ visibility: editUrlCheck ? "visible" : "hidden" }}
        >
          Eroor
        </span>
        <br />
        <em>
          Only Enter If You Want To Edit a Message Sent By Sabre Bot. If Blank
          New Message Will Be Sent.
        </em>
        <br />
        <br />
        <br />
        <br />
        <button
          className="button is-primary"
          onClick={() => sendData()}
          id="sendData"
        >
          <div>
            <div
              className="spinner"
              id="sendDataSpinner"
              style={{ visibility: "hidden" }}
            ></div>
            <p className="padded-button-text-loader">Send Message</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Main;
