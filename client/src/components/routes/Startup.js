import React from "react";
import styled from "@emotion/styled";
import defaultColors from "../../defaultColors";
import { lighten } from "polished";
import CategoryEntryForm from "../forms/CategoryEntry";
import { theme } from "../../globalStyles";
import { toast } from "react-toastify";

const colors = defaultColors;
const boldHighlight = lighten(0.2, colors.link);

// init text
const Wrapper = styled.div`
  ${theme.sizes.colWidth};
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  background-color: ${colors.background};
  position: absolute;
  z-index: 400;
  opacity: ${(props) => (props.fade ? 0 : 1)};
  transition: opacity 600ms ease-in-out;
  -webkit-transition: opacity 600ms ease-in-out;
`;
const Title = styled.h1`
  margin-bottom: 0;
  text-align: center;
`;
const SubtitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  h4 {
    color: ${colors.inactiveColor};
    font-weight: 400;
    margin-top: 0;
    width: 60%;
  }
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
const H3 = styled.h3`
  padding: 10px 20px;
  background-color: ${colors.primary};
  margin: 0 0 15px 0;
  display: block;
  text-align: left;
  width: 100%;
  border-radius: 5px 5px 0 0;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
`;
const DescriptionWrapper = styled.div`
  background-color: ${colors.secondary};
  padding: 0 0 10px 0;
  margin-top: 10px;
  border-radius: 5px;
`;
const LoginButton = styled.a`
  ${theme.baseTypes.button};
  width: 100%;
  max-width: ${theme.sizes.mdCol};
  font-size: 2em;
  margin-bottom: 10px;
  padding: 8px 0;
  text-align: center;
  text-decoration: none;
`;
const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const A = styled.a`
  ${theme.baseTypes.link};
`;
function Startup({ token, fade, setFade, setLoading, setStartupOn }) {
  return (
    <Wrapper fade={fade ? 1 : 0}>
      <Title>Welcome to Dev Notes!</Title>
      <SubtitleWrapper>
        <h4>
          A digital journal specifically streamlined to quickly jot down
          important thoughts and quickly find them later.
        </h4>
      </SubtitleWrapper>
      {token ? (
        <div>
          <h2 style={{ margin: "0 0 10px 0" }}>
            Create your first Category to start:
          </h2>
          <CategoryEntryForm
            token={token}
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
          />
        </div>
      ) : (
        <div>
          <LoginButtonWrapper>
            <LoginButton href="/login">Login</LoginButton>
          </LoginButtonWrapper>
          <P>
            If something isn't working, double check the{" "}
            <A href="https://github.com/Morning-Person-Games/dev-notes#Setup">
              Setup Instructions
            </A>
          </P>
        </div>
      )}
      <DescriptionWrapper>
        <H3>Description and Tips:</H3>
        <P>
          Every <B>Note</B> has a title or <B>Topic</B>, can have any number of{" "}
          <B>Solutions</B> and/or <B>Tags</B>, and are categorized in...{" "}
          <B>Categories</B>.
        </P>
        <P>
          A <B>Topic</B> is the title of a Note.
        </P>

        <P>
          <B>Solutions</B> are the text body(s) of a Topic. I'd bet 75% of mine
          are stackoverflow links.
        </P>
        <P>
          <B>Tags</B>... well everyone knows tags by now. I like to make broader
          Topics and use less Tags, but Tags are still good in a pinch.
        </P>
        <P>
          <B>Categories</B> define which topics can be found when you start
          typing in the search bar, so they are very impactful. If you find that
          you're not sure what category a Topic would be found in, it is likely
          you should make them more broad. I'm currently using Game Dev, Web
          Dev, and Misc as my current categories (Misc will be used sparingly
          and typically for keyboard shortcuts in various apps).
        </P>
      </DescriptionWrapper>
    </Wrapper>
  );
}

export default Startup;
