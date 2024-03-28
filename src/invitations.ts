// import axios, { AxiosResponse } from 'axios';
// import { Errors } from './errors';

// interface Invitation {
//     InvitedBy:  string;
//     UserID:   string;
//     DomainID:  string;
//     Token:    string;
//     Relation:   string;
// }

// class Invitations {
//     private invitations_url: URL;
//     private content_type: string;
//     private invitationsEndpoint: string;
//     private invitationError: Errors;

//     public constructor(invitationsUrl: string) {
//         this.invitations_url = new URL(invitations_url);
//         this.content_type = "application/json";
//         this.invitationsEndpoint = "invitations";
//         this.invitationError = new Errors();
//     }

//     public SendInvitation(invitation: Invitation, token: string): Promise<any> {
//         const options = {
//             method: "post",
//             maxBodyLength: 2000,
//             url: new URL(this.invitationsEndpoint, this.invitations_url).toString(),
//             headers: {
//                 "Content-Type": this.content_type,
//                 Authorisation: `Bearer ${token}`
//             },
//             data: invitation
//         };

//         return axios
//             .request(options)
//             .then((response: AxiosResponse) => {
//                 return response.data;
//             })
//             .catch((error)=> {
//                 if (error.response) {
//                     return this.invitationError.HandleError(
//                         this.invitationError.invitations.SendInvitation,
//                         error.response.status,
//                     );

//                 }
//             })
//     }

// }

// export default Invitations;
