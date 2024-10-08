import { onRegisterClick } from "./src/onRegisterClick.ts";
import { updateLotteries } from "./src/updateLotteries.ts";

const POLLING_INTERVAL_IN_MS = 10000;

const registerButton: HTMLElement | null = document.getElementById("register");
if(registerButton) registerButton.onclick = onRegisterClick;

updateLotteries();

setInterval(()=> updateLotteries(), POLLING_INTERVAL_IN_MS);
