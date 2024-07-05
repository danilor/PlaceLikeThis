import {Button, Text} from 'react-native';
import {Drawer} from 'react-native-drawer-layout';
import {useState} from 'react';

export default function DrawerRender() {
  const [open, setOpen] = useState(true);

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <Text>Drawer content</Text>;
      }}>
      <Button
        onPress={() => setOpen(prevOpen => !prevOpen)}
        title={`${open ? 'Close' : 'Open'} drawer`}
      />
    </Drawer>
  );
}
