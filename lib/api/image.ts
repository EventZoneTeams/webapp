import { storage } from "@/lib/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export namespace Image {
  export async function uploadImage(file: File): Promise<string> {
    try {
      //write a function to upload image to firebase and return the image url
      const randomNameString = Math.random().toString(36).substring(7); // Generate a random string
      const storageRef = ref(storage, `images/${file.name}${randomNameString}`); // Create a reference to the file in Firebase storage
      console.log(storageRef);
      await uploadBytes(storageRef, file); // Upload the file
      const url = await getDownloadURL(storageRef); // Get the download URL
      return url; // Return the image URL
    } catch (error) {
      console.error(error);
      return "djit me AI";
    }
  }
}
