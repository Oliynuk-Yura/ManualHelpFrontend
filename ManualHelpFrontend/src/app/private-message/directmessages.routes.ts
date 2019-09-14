import { RouterModule, Routes } from '@angular/router';

import { PrivateMessageComponent } from '../private-message/private-message/private-message.component';

const routes: Routes = [
    { path: '', component: PrivateMessageComponent }
];

export const DirectMessagesRoutes = RouterModule.forChild(routes);
