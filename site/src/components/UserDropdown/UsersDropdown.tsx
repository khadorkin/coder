import Badge from "@material-ui/core/Badge"
import Divider from "@material-ui/core/Divider"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import MenuItem from "@material-ui/core/MenuItem"
import { fade, makeStyles } from "@material-ui/core/styles"
import AccountIcon from "@material-ui/icons/AccountCircleOutlined"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import * as TypesGen from "../../api/typesGenerated"
import { BorderedMenu } from "../BorderedMenu/BorderedMenu"
import { CloseDropdown, OpenDropdown } from "../DropdownArrows/DropdownArrows"
import { DocsIcon } from "../Icons/DocsIcon"
import { LogoutIcon } from "../Icons/LogoutIcon"
import { UserAvatar } from "../UserAvatar/UserAvatar"
import { UserProfileCard } from "../UserProfileCard/UserProfileCard"

export const Language = {
  accountLabel: "Account",
  docsLabel: "Documentation",
  signOutLabel: "Sign Out",
}
export interface UserDropdownProps {
  user: TypesGen.User
  onSignOut: () => void
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ user, onSignOut }: UserDropdownProps) => {
  const styles = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>()

  const handleDropdownClick = (ev: React.MouseEvent<HTMLLIElement>): void => {
    setAnchorEl(ev.currentTarget)
  }
  const onPopoverClose = () => {
    setAnchorEl(undefined)
  }

  return (
    <>
      <MenuItem onClick={handleDropdownClick} data-testid="user-dropdown-trigger">
        <div className={styles.inner}>
          <Badge overlap="circle">
            <UserAvatar username={user.username} />
          </Badge>
          {anchorEl ? <CloseDropdown /> : <OpenDropdown />}
        </div>
      </MenuItem>

      <BorderedMenu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={!!anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        marginThreshold={0}
        variant="user-dropdown"
        onClose={onPopoverClose}
      >
        <div className={styles.userInfo}>
          <UserProfileCard user={user} />

          <Divider />

          <Link to="/preferences/account" className={styles.link}>
            <MenuItem className={styles.menuItem} onClick={onPopoverClose}>
              <ListItemIcon className={styles.icon}>
                <AccountIcon />
              </ListItemIcon>
              <ListItemText primary={Language.accountLabel} />
            </MenuItem>
          </Link>

          <a
            href={`https://github.com/coder/coder/tree/${process.env.CODER_VERSION}/docs`}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            <MenuItem className={styles.menuItem} onClick={onPopoverClose}>
              <ListItemIcon className={styles.icon}>
                <DocsIcon />
              </ListItemIcon>
              <ListItemText primary={Language.docsLabel} />
            </MenuItem>
          </a>

          <MenuItem className={styles.menuItem} onClick={onSignOut}>
            <ListItemIcon className={styles.icon}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={Language.signOutLabel} />
          </MenuItem>
        </div>
      </BorderedMenu>
    </>
  )
}

export const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  inner: {
    display: "flex",
    alignItems: "center",
    minWidth: 0,
    maxWidth: 300,
  },

  userInfo: {
    marginBottom: theme.spacing(1),
  },

  menuItem: {
    height: 44,
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2.75)}px`,

    "&:hover": {
      backgroundColor: fade(theme.palette.primary.light, 0.1),
      transition: "background-color 0.3s ease",
    },
  },

  link: {
    textDecoration: "none",
    color: "inherit",
  },

  icon: {
    color: theme.palette.text.secondary,
  },
}))
