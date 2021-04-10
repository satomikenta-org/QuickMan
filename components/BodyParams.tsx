import { Textarea } from 'bumbag';
import { useEffect, useState } from 'react';
import { useHttpReqCtx } from '../hooks/useHttpRequestCtx';
import { Body } from '../lib/http';

export const BodyParams: React.FC = () => {
  const { state, dispatch } = useHttpReqCtx();
  const [ bodyStr, setBodyStr ] = useState("");

  useEffect(() => {
    if (bodyStr) {
      const b = new Body(bodyStr);
      dispatch({ type: 'SET_BODY', payload: { ...state, body: b }});
    }
  }, [bodyStr]);

  return (
    <Textarea 
      state="primary" 
      size="large" 
      multiple 
      placeholder="JSON here."
      style={{height: "250px"}} 
      value={bodyStr}
      onChange={ (e: any) => setBodyStr(e.target.value)}
    />
  );
}