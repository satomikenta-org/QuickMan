import { PageWithSidebar, Box, Flex, Menu, Divider } from 'bumbag';
import Image from 'next/image';

export const Layout: React.FC = ({ children }) => {
  return (
    <PageWithSidebar sidebar={<Box minHeight="100vh"><SideBar/></Box>} sidebarWidth="220px">
      <PageContentWrapper>
        { children }
      </PageContentWrapper>
    </PageWithSidebar>
  )
}

const PageContentWrapper: React.FC = ({ children }) => {
  return (
    <Flex alignX="center" style={{ height: '90vh', paddingTop: "60px"}}>
      { children }
    </Flex>
  )
}

const SideBar: React.FC = () => {
  return (
    <Flex padding="20px" flexDirection="column">
      <div style={{ fontSize: "1.5rem", fontWeight: "bold", display: "flex", flexDirection: "row" }}>
        <Image
          src="/logo.png"
          alt="Picture of the author"
          width={30}
          height={45}
        />
        <div style={{ marginLeft: "10px", marginTop: "3px" }}>QuickMan</div>
      </div>
      <Divider style={{ marginTop: "15px", marginBottom: '15px'}}/>
      <Menu>
        <Menu.Group title="Actions">
          <Menu.Item iconBefore="solid-pen">
            Edit
          </Menu.Item>
          <Menu.Item iconBefore="solid-share">
            Share
          </Menu.Item>
          <Menu.Item iconBefore="solid-file-signature">
            Rename
          </Menu.Item>
          <Menu.Item iconBefore="solid-trash-alt" color="danger">
            Delete
          </Menu.Item>
        </Menu.Group>
        <Menu.Divider />
        <Menu.Group title="Links">
          <Menu.Item
            iconAfter="solid-external-link-alt"
          >
            Go to Google
          </Menu.Item>
        </Menu.Group>
      </Menu>
    </Flex>
  )
}