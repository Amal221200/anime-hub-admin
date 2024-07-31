import { CircleUserIcon, HomeIcon, NewspaperIcon, PlusIcon, ShellIcon, UserIcon } from "lucide-react";

export const APP_DEFAULT_TITLE = "Anime Hub - Admin"
export const APP_TITLE_TEMPLATE = "Anime Hub - Admin | %s"
export const APP_DESCRIPTION = "Application for admins"
export const APP_NAME = "Admin"

export const sidebarLinks = [
    {
      href: "/",
      icon: HomeIcon,
      label: "Home"
    },
    {
      href: "/user",
      label: "User",
      icon: UserIcon
    },
    {
      href: "/admin-user",
      label: "Admin Users",
      icon: CircleUserIcon
    },
    {
      href: "/add",
      label: "Add",
      icon: PlusIcon
    },
    {
      href: "/anime",
      label: "Anime",
      icon: ShellIcon
    },
    {
      href: "/blog",
      label: "Blog",
      icon: NewspaperIcon
    }
  ]