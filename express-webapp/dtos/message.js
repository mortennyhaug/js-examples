class Message {
	
	constructor (id, text) {
		this.id = id;
		this.text = text;
	}
	
	static aMessage() {
		class Builder {
			
			withId(id) {
				this.id = id;
				return this;
			}
			
			withText(text) {
				this.text = text;
				return this;
			}
			
			copiedFrom(message) {
				if (message) {
					this.id = message.id;
					this.text = message.text;
				}
				return this;
			}
			
			build() {
				return new Message(this.id, this.text);
			}
		}
		
		return new Builder();
	}
}

module.exports = Message;