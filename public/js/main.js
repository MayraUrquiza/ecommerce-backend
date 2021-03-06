const socket = io();

const loadMessages = async (messages) => {
  const template = await searchMessagesTemplate();
  const html = getHtml(template, { messages });

  document.getElementById("messages").innerHTML = html;
  document.getElementById("messages").scrollTop =
    document.getElementById("messages").scrollHeight;
};

const searchMessagesTemplate = async () => {
  const res = await fetch("/templates/messages.hbs");
  return await res.text();
};

socket.on("refreshMessages", (messages) => {
  loadMessages(messages);
});

const addMessage = (form) => {
  const message = {
    email: form["email"].value,
    message: form["message"].value,
    date: new Date().toLocaleString(),
  };

  socket.emit("addMessage", message);

  form.reset();
  return false;
};

const getHtml = (template, items) => {
  const render = Handlebars.compile(template);
  return render(items);
};
