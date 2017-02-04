import { Injectable } from '@angular/core';

@Injectable()
export class ConnectionService {
	protected serverUrl = 'http://localhost:3000';

	constructor() {  }

}
