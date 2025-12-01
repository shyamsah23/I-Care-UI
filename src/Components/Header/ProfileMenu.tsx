import React from 'react'
import { Menu, Button, Text, Avatar } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";


const ProfileMenu=()=> {
 return (
   <Menu
     shadow="md"
     width={220}
     position="bottom-end"
     transitionProps={{ transition: "pop", duration: 150 }}
     classNames={{
       dropdown:
         "bg-slate-900 text-slate-100 border border-emerald-500/40 shadow-xl",
       label: "text-emerald-300 font-semibold",
       item: "hover:bg-emerald-600/30 hover:text-emerald-50",
       divider: "border-slate-700",
     }}
   >
     <Menu.Target>
       <div className="flex items-center gap-3 cursor-pointer">
         <span className="font-medium text-lg text-emerald-50">Ayush</span>
         <div className="p-1 bg-emerald-500/20 rounded-full border border-emerald-400/60 shadow-md">
           <Avatar
             variant="filled"
             src="../myAvatar.png"
             size={35}
             alt="it's me"
             radius="xl"
           />
         </div>
       </div>
     </Menu.Target>

     <Menu.Dropdown>
       <Menu.Label>Application</Menu.Label>
       <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
       <Menu.Item leftSection={<IconMessageCircle size={14} />}>
         Messages
       </Menu.Item>
       <Menu.Item leftSection={<IconPhoto size={14} />}>Gallery</Menu.Item>
       <Menu.Item
         leftSection={<IconSearch size={14} />}
         rightSection={
           <Text size="xs" c="dimmed">
             ⌘K
           </Text>
         }
       >
         Search
       </Menu.Item>

       <Menu.Divider />

       <Menu.Label>Danger zone</Menu.Label>
       <Menu.Item leftSection={<IconArrowsLeftRight size={14} />}>
         Transfer my data
       </Menu.Item>
       <Menu.Item
         color="red"
         leftSection={<IconTrash size={14} />}
         className="hover:bg-red-600/40 hover:text-red-50"
       >
         Delete my account
       </Menu.Item>
     </Menu.Dropdown>
   </Menu>
 );
}
export default ProfileMenu;
