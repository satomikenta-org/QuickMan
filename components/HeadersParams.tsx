import { FieldStack, InputField, Divider, Stack } from 'bumbag';
import { useEffect, useState } from 'react';
import { useHttpReqCtx } from '../hooks/useHttpRequestCtx';
import { HeaderSet } from '../lib/http';

const sampleHeaders = [
  { key: "Authorization", value: "Bearer eyJhbGciOiJIU..." },
  { key: "Cookie", value: "my_cookie_name=eyJhbGciOiJIU..." },
  { key: "ContentType", value: "application/json" },
];

export const HeadersParams: React.FC = () => {
  const { state, dispatch } = useHttpReqCtx();
  const [ keys, setKeys ] = useState<HeaderSet>({});
  const [ values, setValues ] = useState<HeaderSet>({});
  
  useEffect(() => {
    const keysArr = Object.keys(keys);
    const valuesArr = Object.keys(values);
    if (keysArr.length && valuesArr.length) {
      const h: any = {};
      for (let key of keysArr) {
        h[keys[key]] = values[key];
      }
      dispatch({ type: 'SET_HEADERS', payload: {...state, headers: h }});
    }
  }, [keys, values])

  const handleOnChangeKey = (e: any) => {
    setKeys(old => ({...old,[e.target.name]: e.target.value}));
  }

  const handleOnChangeValue = (e: any) => {
    setValues(old => ({...old, [e.target.name]: e.target.value}));
  }

  return (
    <div>
      <Stack orientation="horizontal">
        <div style={{ padding: '5px', fontSize: '.88rem', fontWeight: 'bold', color: 'gray' }}>Key</div>
        <div style={{ padding: '5px', fontSize: '.88rem', marginLeft: '-10px', fontWeight: 'bold', color: 'gray' }}>Value</div>
      </Stack>
      
      { sampleHeaders.map((sample, idx) => (
        <div key={idx}>
          <FieldStack orientation="horizontal" key={sample.key}>
            <InputField size="small" name={String(idx)} onChange={handleOnChangeKey} placeholder={sample.key} />
            <InputField size="small" name={String(idx)} onChange={handleOnChangeValue} placeholder={sample.value} />
          </FieldStack>
          <Divider margin="10px"/>
        </div>
      ))}
    </div>
  );
}