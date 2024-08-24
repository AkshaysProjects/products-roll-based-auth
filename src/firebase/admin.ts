import { type ServiceAccount, cert, initializeApp } from "firebase-admin/app";
import { env } from "../env";

const serviceAccount: ServiceAccount = {
	projectId: env.FIREBASE_PROJECT_ID,
	privateKey: env.FIREBASE_PRIVATE_KEY,
	clientEmail: env.FIREBASE_CLIENT_EMAIL,
};

initializeApp({
	credential: cert(serviceAccount),
	storageBucket: env.FIREBASE_BUCKET,
});
