export async function onRegisterClick() {
  const name = document.getElementById("name").value;
  const checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  );

  // TODO: Register the user for each selected lottery using the POST /register endpoint.
  // 1. Use the `fetch` API to make the request.
  // 2. Obtain the user's name from the `nameInput` element.
  // 3. Check status of the lottery checkboxes using the `checked` property.

  checkboxes.forEach((checkbox) => {
    if(checkbox.checked) {
      const lotteryId = checkbox.id;
      try {
        const response = await fetch()
      }
    }
  })

}