# @harishboke/n8n-nodes-wagateway

Official n8n community nodes for [WA Gateway](https://github.com/HarishBoke/wagateway-suite) - Self-hosted Messaging API Gateway.

This package provides two nodes:

- **WA Gateway** - Execute operations like sending messages, checking contacts, managing webhooks
- **WA Gateway Trigger** - Start workflows when WhatsApp events occur (incoming messages, session status changes)

## Installation

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `@harishboke/n8n-nodes-wagateway` and agree to the risks
4. Restart n8n

### Manual Installation

```bash
cd ~/.n8n/nodes
npm install @harishboke/n8n-nodes-wagateway
```

## Credentials

You need to configure WA Gateway API credentials:

| Field          | Description                                             |
| -------------- | ------------------------------------------------------- |
| **Server URL** | Your WA Gateway server URL (e.g., `https://wa.example.com`) |
| **API Key**    | API key from your WA Gateway dashboard                      |

## Nodes

### WA Gateway Node

Execute operations on your WA Gateway server.

#### Resources & Operations

| Resource    | Operation     | Description                      |
| ----------- | ------------- | -------------------------------- |
| **Session** | Get Status    | Get the status of a session      |
| **Session** | List All      | List all sessions                |
| **Message** | Send Text     | Send a text message              |
| **Message** | Send Image    | Send an image (URL or Base64)    |
| **Message** | Send Document | Send a document/file             |
| **Message** | Send Location | Send a location pin              |
| **Contact** | Check Exists  | Check if a number is on WhatsApp |
| **Contact** | Get Info      | Get contact information          |
| **Webhook** | Create        | Create a webhook                 |
| **Webhook** | Delete        | Delete a webhook                 |

#### Example: Send Text Message

1. Add an **WA Gateway** node
2. Select **Message** resource and **Send Text** operation
3. Configure:
   - **Session ID**: `default` (or your session name)
   - **Chat ID**: `628123456789@c.us`
   - **Message**: `Hello from n8n!`

### WA Gateway Trigger Node

Start workflows when events occur on your WhatsApp session.

#### Supported Events

| Event                  | Description                    |
| ---------------------- | ------------------------------ |
| `message.received`     | New incoming message           |
| `message.sent`         | Message successfully sent      |
| `session.connected`    | Session authenticated          |
| `session.disconnected` | Session lost connection        |
| `session.qr_ready`     | QR code generated for scanning |

#### Example: Auto-reply Workflow

1. Add an **WA Gateway Trigger** node
2. Configure:
   - **Session ID**: `default`
   - **Events**: `Message Received`
3. Connect to an **WA Gateway** node to send a reply

#### Trigger Output Data

```json
{
  "event": "message.received",
  "timestamp": "2024-01-15T10:30:00Z",
  "sessionId": "default",
  "data": {
    "messageId": "3EB0F5A2B4C...",
    "chatId": "628123456789@c.us",
    "from": "628123456789@c.us",
    "body": "Hello!",
    "type": "text",
    "timestamp": 1705312200
  }
}
```

## Example Workflows

### Auto-reply to Messages

```
[WA Gateway Trigger] → [IF: Check keyword] → [WA Gateway: Send Text]
```

### Session Monitoring

```
[WA Gateway Trigger: session.disconnected] → [Slack: Send Alert]
```

### Lead Collection

```
[WA Gateway Trigger] → [Google Sheets: Append Row] → [WA Gateway: Send Text]
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Lint
npm run lint

# Format
npm run format
```

## Links

- [WA Gateway Repository](https://github.com/HarishBoke/wagateway-suite)
- [WA Gateway Documentation](https://github.com/HarishBoke/wagateway-suite/tree/main/_docs)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

MIT
