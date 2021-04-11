import { Card, Divider, Flex, Stack, Button, Select } from 'bumbag';
import { Markdown } from 'bumbag-addon-markdown';
import { useRef, useState } from 'react';
const { CopyToClipboard } = require('react-copy-to-clipboard');
import { useHttpReqCtx } from '../hooks/useHttpRequestCtx';
import { generate, TargetLanguage } from '../lib/typegen';

export const ResponseArea: React.FC = () => {
  const bottomElm = useRef<HTMLDivElement>(null);
  const { state } = useHttpReqCtx();
  const [ language, setLanguage ] = useState<TargetLanguage>("ts");
  const [ generatedTypeStr, setGeneratedTypeStr ] = useState<string[]>([]);
  const statusColor = String(state.statusCode)[0] === "2" ? "green" : "red";

  const handleGenerate = async () => {
    if (!state.response) return;
    const str = await generate(language, state.response);
    setGeneratedTypeStr(str);
    scrollToBottom();
  }

  const scrollToBottom = () => {
    bottomElm.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Flex flexDirection="column" marginTop="30px">
      <Stack orientation="horizontal" marginRight="20px">
        <div style={{ color: "gray", fontSize: '1.2rem', fontWeight: "bold" }}>Response</div>
        <Stack orientation="horizontal" width="65%">
          <Select
            onChange={(e: any) => setLanguage(e.target.value)}
            options={[
              { label: 'Typescript', value: 'ts' },
              { label: 'Dart', value: 'dart' },
            ]}
          />
          <Button palette="primary" onClick={handleGenerate}>Generate Types</Button>
        </Stack>
      </Stack>
      <Divider marginTop="10px" marginBottom="20px"/>
      <Stack orientation="horizontal" alignY="bottom">
        { state.statusCode != 0 && (
          <div 
            style={{ fontSize: ".9rem", fontWeight: "bold", color: "gray", marginTop: "-10px", marginBottom: '10px' }}
          >StatusCode: <span style={{ color: statusColor }}>{ state.statusCode }</span>
          </div>) 
        }
        { state.responseCookie && (
          <>
            <div
              style={{ fontSize: ".9rem", fontWeight: "bold", color: "gray", marginTop: "-10px", marginBottom: '10px' }}
            >Cookie: <span>{ state.responseCookie.slice(0, 20) + "..." }</span>
            </div>
            <button style={{ 
                width: '100px',
                cursor: 'pointer', 
                borderRadius: "45px", 
                height: '25px', 
                marginTop: "-10px", 
                marginBottom: '10px' 
            }}>
              <CopyToClipboard text={state.responseCookie}>
                <span style={{  fontSize: '.88rem' }}>copy cookie</span>
              </CopyToClipboard>
            </button>
          </>
          )
        }
      </Stack>
      <Card style={{ width: "98%", maxWidth: "1100px" }}>
      { state.response && (
        <Markdown
          style={{ maxWidth: "100%" }}
          content={state.response}
        />)
      }
      </Card>
      
      { generatedTypeStr.length > 0 && ( 
        <>
          <div 
            style={{ width: "100%", color: "#574feb", fontSize: "1.2ren", fontWeight: "bold", marginBottom: "5px", marginTop: "30px", paddingRight: "50px" }}
          >Generated Types
          </div>
          <div ref={bottomElm} />
          <Card style={{ width: "98%", maxWidth: "1100px", marginBottom: "30px" }}>
            { generatedTypeStr.map((line, idx) => (
              <div
                key={idx}
                dangerouslySetInnerHTML={{
                  __html: line
                }}
              />
            ))}
          </Card>
        </>)
      }
    </Flex>
  );
}