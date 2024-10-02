import { onRegisterClick } from "./src/onRegisterClick";
import { updateLotteries } from "./src/updateLotteries";

const POLLING_INTERVAL_IN_MS = 10000;

const registerButton = document.getElementById("register");
registerButton.onclick = onRegisterClick;

updateLotteries();

setInterval(()=> updateLotteries(), POLLING_INTERVAL_IN_MS);
