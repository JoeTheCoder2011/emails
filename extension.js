class EmailExtension {
  constructor(runtime) {
    this.runtime = runtime;
    this.serverBaseUrl = 'http://localhost:3000'; // Default URL, user can modify
  }

  getInfo() {
    return {
      id: 'emailExtension',
      name: 'Email',
      color1: '#FFD166',
      color2: '#EF476F',
      blocks: [
        {
          opcode: 'sendEmail',
          blockType: Scratch.BlockType.COMMAND,
          text: 'send email to [TO] with subject [SUBJECT] and body [BODY]',
          arguments: {
            TO: { type: Scratch.ArgumentType.STRING, defaultValue: 'example@example.com' },
            SUBJECT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
            BODY: { type: Scratch.ArgumentType.STRING, defaultValue: 'This is a message.' }
          }
        },
        {
          opcode: 'sendEmailWithAttachment',
          blockType: Scratch.BlockType.COMMAND,
          text: 'send email with subject [SUBJECT], body [BODY], and attachment [ATTACHMENT] to [TO]',
          arguments: {
            SUBJECT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
            BODY: { type: Scratch.ArgumentType.STRING, defaultValue: 'Message with file' },
            ATTACHMENT: { type: Scratch.ArgumentType.STRING, defaultValue: 'file.txt' },
            TO: { type: Scratch.ArgumentType.STRING, defaultValue: 'example@example.com' }
          }
        },
        {
          opcode: 'startEmailServer',
          blockType: Scratch.BlockType.COMMAND,
          text: 'start email server on port [PORT]',
          arguments: {
            PORT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3000 }
          }
        }
      ]
    };
  }

  async sendEmail(args) {
    const response = await fetch(`${this.serverBaseUrl}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: args.TO,
        subject: args.SUBJECT,
        body: args.BODY
      })
    });
    const result = await response.json();
    console.log(result);
  }

  async sendEmailWithAttachment(args) {
    const response = await fetch(`${this.serverBaseUrl}/send-attachment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: args.TO,
        subject: args.SUBJECT,
        body: args.BODY,
        attachment: args.ATTACHMENT
      })
    });
    const result = await response.json();
    console.log(result);
  }

  async startEmailServer(args) {
    this.serverBaseUrl = `http://localhost:${args.PORT}`;
    console.log(`Server base URL updated to ${this.serverBaseUrl}`);
  }
}

Scratch.extensions.register(new EmailExtension());
