import { Notifications } from '@mantine/notifications';
import { Welcome } from './Welcome/Welcome';
import { MantineProvider } from '@mantine/core';

export default function App() {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Notifications />
      <Welcome />
    </MantineProvider>
  );
}
