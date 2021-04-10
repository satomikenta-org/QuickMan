import { Stack, Divider } from 'bumbag';
import { Layout } from "../../components/Layout";
import { RequestArea } from '../../components/RequestArea';
import { RequestParamerters } from '../../components/RequestParameters';
import { ResponseArea } from '../../components/ResponseArea';

export default function() {
  return (
    <Layout>
      <Stack orientation="vertical" spacing="major-2" marginLeft="20px">
        <div style={{ color: "gray", fontWeight: "bold", fontSize: '1.2rem', }}>Request</div>
        <RequestArea/>
        <RequestParamerters/>
        <Divider margin="20px"/>
        <ResponseArea/>
      </Stack>
    </Layout>
  )
} 