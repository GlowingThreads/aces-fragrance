import Link from "next/link";
import site from "../site.config";
import CartButton from "./CartButton";
import NavLinks from "./NavLinks";
import Icon from "./Icon";
import Emblem from "./Emblem";

export default function Header() {
  return (
    <>
      {site.announcement && <p className="announce">{site.announcement}</p>}
      <header className="header">
        <div className="wrap bar">
          <Link href="/" className="brand" aria-label={`${site.name}, home`}>
            <Emblem />
            <span className="brand-name">
              <span className="metal">{site.name}</span>
              <small>{site.slogan}</small>
            </span>
          </Link>
          <NavLinks />
          {site.storeId && (
            <div className="bar-tools">
              {/* A normal link (full page load) so Lightspeed's account screen always starts fresh. */}
              <a className="tool account-btn" href="/account" aria-label="My account">
                <Icon name="user" />
                <span>Account</span>
              </a>
              <CartButton />
            </div>
          )}
        </div>
      </header>
    </>
  );
}
