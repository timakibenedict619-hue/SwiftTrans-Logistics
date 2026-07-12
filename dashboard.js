import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const totalShipments = document.getElementById("totalShipments");
const pendingShipments = document.getElementById("pendingShipments");
const transitShipments = document.getElementById("transitShipments");
const deliveredShipments = document.getElementById("deliveredShipments");

export async function loadDashboard() {

    try {

        const snapshot = await getDocs(collection(db, "shipments"));

        let total = 0;
        let pending = 0;
        let transit = 0;
        let delivered = 0;

        snapshot.forEach((doc) => {

            total++;

            const shipment = doc.data();

            switch (shipment.status) {

                case "Pending":
                    pending++;
                    break;

                case "In Transit":
                    transit++;
                    break;

                case "Delivered":
                    delivered++;
                    break;
            }

        });

        if (totalShipments) totalShipments.textContent = total;
        if (pendingShipments) pendingShipments.textContent = pending;
        if (transitShipments) transitShipments.textContent = transit;
        if (deliveredShipments) deliveredShipments.textContent = delivered;

    } catch (error) {

        console.error("Dashboard Error:", error);

    }

}

// Refresh every 10 seconds
loadDashboard();
setInterval(loadDashboard, 10000);
