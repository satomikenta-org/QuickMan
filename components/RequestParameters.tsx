import { Tabs } from 'bumbag';
import { BodyParams } from './BodyParams';
import { HeadersParams } from './HeadersParams';

export const RequestParamerters: React.FC = () => {
  return (
    <Tabs selectedId="tab1">
      <Tabs.List>
        <Tabs.Tab tabId="tab1">Headers</Tabs.Tab>
        <Tabs.Tab tabId="tab2">Body</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel tabId="tab1" padding="major-2">
        <HeadersParams/>
      </Tabs.Panel>
      <Tabs.Panel tabId="tab2" padding="major-2">
        <BodyParams/>
      </Tabs.Panel>
    </Tabs>
  )
}