import {db} from './firebase.js';
import {collection,addDoc,serverTimestamp} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

function trackingId(){
 return 'ST-'+Date.now().toString().slice(-8)+'-'+Math.random().toString(36).substring(2,6).toUpperCase();
}
document.getElementById('shipmentForm').addEventListener('submit',async e=>{
 e.preventDefault();
 const f=e.target;
 const id=trackingId();
 await addDoc(collection(db,'shipments'),{
 trackingId:id,
 senderName:f.senderName.value,
 receiverName:f.receiverName.value,
 receiverEmail:f.receiverEmail.value,
 origin:f.origin.value,
 destination:f.destination.value,
 currentLocation:f.currentLocation.value,
 status:f.status.value,
 createdAt:serverTimestamp()
 });
 alert('Shipment created. Tracking ID: '+id);
 f.reset();
});
