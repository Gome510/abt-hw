export async function onRegisterClick() {
  const nameInput = document.getElementById("name") as HTMLInputElement;
  if(!nameInput) return;

  const name = nameInput ? nameInput.value : "";
  const checkboxes : HTMLInputElement[] = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  );
  const isAnyChecked = checkboxes.some((checkbox)=> checkbox.checked);

  if(name && isAnyChecked) {
    if(name && isAnyChecked) {
      try {
        await Promise.all(
          checkboxes
            .filter((checkbox)=> checkbox.checked)
            .map((checkbox)=>
              fetch(`${import.meta.env.VITE_API_URL}/register`, {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                  lotteryId: checkbox.id,
                  name: name
                })
              })
            )
        )

        nameInput.value = "";
        alert(`Successfully registered ${name} for the selected lotteries!`);
      } catch (error ) {
        if (error instanceof Error) {
          console.error("Error registering for lotteries:", error.message);
        } else {
          console.error("Error registering for lotteries:", error);
        }
      }
    }
  }
}