import React, { useState } from "react";
import styled from "@emotion/styled";
import defaultColors from "../styles/defaultColors";
import DemoCategoryEntryForm from "./DemoCategoryEntry";
import { baseTypes, staticSizes } from "../styles/globalStyles";
import { toast } from "react-toastify";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

const boldHighlight = "#E6D17E";

// init text
const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  background-color: ${defaultColors.background};
  position: absolute;
  z-index: 4100;
  width: 100%;
  opacity: ${(props) => (props.fade ? 0 : 1)};
  transition: opacity 600ms ease-in-out;
  -webkit-transition: opacity 600ms ease-in-out;
`;

const Title = styled.h1`
  margin-bottom: 0;
  text-align: center;
`;
const Subtitle = styled.h4`
  color: ${defaultColors.inactiveColor};
  font-weight: 400;
  margin-top: 0;
  width: 100%;
`;
const DemoText = styled(Subtitle)`
  color: ${defaultColors.placeholder};
  width: 100%;
  max-width: initial;
`;
const P = styled.p`
  margin: 0.5em 0;
  padding: 0 20px;
  width: 100%;
  flex-basis: 100%;
  display: block;
  text-align: left;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
`;
const B = styled.b`
  color: ${boldHighlight};
`;
const DescriptionToggle = styled.button`
  border-radius: ${(props) =>
    props.expanded ? "5px 5px 0 0" : "5px 5px 5px 5px"};
  font-size: 1em;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  color: ${defaultColors.white};
  background-color: ${defaultColors.primary};
  &:hover {
    background-color: ${defaultColors.fieldHover};
  }
  svg {
    font-size: ${staticSizes.font.xl};
  }
  span {
    padding: 10px 0;
    font-size: ${staticSizes.font.lg};
    font-weight: 700;
    flex-grow: 1;
    text-align: left;
  }
`;
const DescriptionWrapper = styled.div`
  background-color: ${defaultColors.secondary};
  padding: 0;
  margin: 20px 0;
  border-radius: 5px;
`;
const DescriptionBody = styled.div`
  background-color: ${defaultColors.secondary};
  padding: 0 0 10px 0;
  padding-bottom: ${(props) => !props.expanded && "0"};
  margin: 0;
  border-radius: 0 0 5px 5px;
  overflow: hidden;
  transition: max-height 0.2s ease-in;
  height: auto;
  max-height: ${(props) => (props.expanded ? "290px" : "0")};
`;
const FormWrapper = styled.div`
  max-width: 610px;
  background-color: ${defaultColors.secondary};
  border-radius: 5px;
  padding: 20px 10px 0 10px;
  margin-bottom: 20px;
`;
const StartupWrapper = styled(baseTypes.MainContent)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

function Startup({
  fade,
  setFade,
  setLoading,
  setStartupOn,
  topics,
  setTopics,
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Wrapper fade={fade ? 1 : 0}>
      <StartupWrapper>
        <Title>Welcome to the Dev Notes Demo!</Title>
        <Subtitle>
          Dev Notes is a digital journal streamlined to quickly save notes, and
          quickly find them.
        </Subtitle>
        <FormWrapper>
          <h2 style={{ margin: "0 0 10px 0" }}>
            Create your first Category to start:
          </h2>
          <DemoCategoryEntryForm
            callback={() => {
              setStartupOn(true);
              setLoading(true);
              const notifID = toast.loading("Settings things up...");
              setTimeout(() => {
                setFade(true);
                toast.update(notifID, {
                  render: "Have fun!",
                  type: "success",
                  isLoading: false,
                  autoClose: 3000,
                });
              }, 2000);
            }}
            startup={true}
            setTopics={setTopics}
            topics={topics}
          />
          <DemoText>
            This is a demo,{" "}
            <b>so everything you make here will not be saved.</b> If you decide
            you want to use Dev Notes for yourself, you'll set it up with{" "}
            <a
              href="https://www.contentful.com/"
              target="__blank"
              rel="noreferrer"
            >
              Contentful
            </a>
            , and all your Notes will be saved in there! You can find the
            current setup instructions{" "}
            <a
              href="https://github.com/Morning-Person-Games/dev-notes#setup"
              target="__blank"
              rel="noreferrer"
            >
              here
            </a>
            .
          </DemoText>
        </FormWrapper>
        <DescriptionWrapper>
          <DescriptionToggle
            type="button"
            expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            <span>Description and Tips</span>
            {expanded ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
          </DescriptionToggle>
          <DescriptionBody expanded={expanded}>
            <P>
              Every <B>Note</B> has a <B>Topic</B> (a title), can have any
              number of <B>Solutions</B> and/or <B>Tags</B>, and are categorized
              in... <B>Categories</B>.
            </P>
            <P>
              A <B>Topic</B> is the title of a Note.
            </P>

            <P>
              <B>Solutions</B> are the text body(s) of a Topic. I'd bet around
              75% of mine are stackoverflow links. Also! Pasting a url to an
              image will automatically render the image in the content list.
            </P>
            <P>
              <B>Tags</B>... well everyone knows tags by now. I like to make
              broader Topics for my Notes and use less Tags, but Tags are still
              good in a pinch.
            </P>
            <P>
              <B>Categories</B> define which topics can be found when you start
              typing in the search bar, so they are very impactful. If you find
              that you're not sure what category a Topic would be found in, it
              is likely you should make them more broad. I'm currently using
              Game Dev, Web Dev, and Misc as my current categories (Misc will be
              used sparingly and typically for keyboard shortcuts in various
              apps).
            </P>
          </DescriptionBody>
        </DescriptionWrapper>
      </StartupWrapper>
    </Wrapper>
  );
}

export default Startup;
