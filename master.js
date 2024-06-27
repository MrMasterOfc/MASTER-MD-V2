import amd from './lib';

amd(
  {
    pattern: "master", // The Command Name
    alias: "hello" // Command Secondary Trigger
    fromMe: true, // is the message from the owner
    desc: "Send Hi Message", // Command Description
    type: "Test", // Command Category
  },
  async (message) => {
    await message.send("Hello There");
  }
);
