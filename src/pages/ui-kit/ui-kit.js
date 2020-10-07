import header from "../../components/header/header";
import GuestsDropdownMenu from "@/components/guests-dropdown/GuestDropdownMenu";
import FurnitureDropdownMenu from "@/components/furniture-dropdown/FurnitureDropdownMenu";

function requireAll(r) {
  return r.keys().map(r);
}

requireAll(require.context("@components", true, /\.js|scss$/));
requireAll(require.context("@/pages/ui-kit", true, /\.js|scss$/));
requireAll(require.context("@/theme", true, /\.js|scss$/));

GuestsDropdownMenu.initAll({});
FurnitureDropdownMenu.initAll({});
header.init();
