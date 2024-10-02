export async function onRegisterClick() {
  const name = document.getElementById("name").value;
  const nameInput = document.getElementById("name");
  const checkboxes = Array.from(
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
              fetch("http://localhost:5173/register", {
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
      } catch (error) {
        console.error("Error registering for lotteries:", error.message )
      }
    }
  }
}