import { InputField, Select, Button, Stack, useToasts } from 'bumbag';
import { useEffect, useState } from 'react';
import { useHttpReqCtx } from '../hooks/useHttpRequestCtx';
import { HttpClient, HttpMethod } from '../lib/http';

export const RequestArea: React.FC = () => {
  const toasts = useToasts();
  const { state, dispatch } = useHttpReqCtx();
  const [ url, setUrl ] = useState("");
  const [ method, setMethod ] = useState<HttpMethod>("get");

  useEffect(() => {
    if (!url) return;
    dispatch({type: 'SET_URL', payload: { ...state, url }});
  }, [url]);

  useEffect(() => {
    if (!method) return;
    dispatch({type: 'SET_METHOD', payload: { ...state, method }});
  }, [method]);

  
  const handleOnSend = async () => {
    const { url, method, headers, body } = state;
    if (!url) return;
    try {
      const client = new HttpClient(url, method, headers, body);
      await client.request();
      dispatch({ 
        type: "SET_RESPONSE", 
        payload: { ...state, response: client.outputResponse(), statusCode: client.statusCode!, responseCookie: client.responseCookie }
      });
      toasts.success({title: "Success"});
    } catch (ex) {
      toasts.danger({title: "Error", message: ex.message});
    }
  }

  return (
    <Stack orientation="horizontal" alignY="center" spacing="major-2">
      <Select
        value={method}
        options={[
          { label: 'GET', value: 'get' },
          { label: 'POST', value: 'post' },
          { label: 'PUT', value: 'put' },
          { label: 'PATCH', value: 'patch' },
          { label: 'DELETE', value: 'delete' }
        ]}
        onChange={ (e: any) => setMethod(e.target.value as HttpMethod)}
      />
      <InputField placeholder="http://localhost" value={url} onChange={(e: any) => setUrl(e.target.value)} style={{ width: "50vw", maxWidth: "700px"}}/>
      <Button palette="primary" style={{ width: "120px"}} onClick={handleOnSend}>Send</Button>
    </Stack>
  )
}