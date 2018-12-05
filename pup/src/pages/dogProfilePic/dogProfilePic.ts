import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

declare var cordova: any;

@Component({
  selector: 'page-dogProfilePic',
  templateUrl: 'dogProfilePic.html'
})
export class DogProfilePicPage {
  lastImage: string = null;
  loading: Loading;

  constructor(public navCtrl: NavController, private camera: Camera, private transfer: Transfer,
    private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController,
    public globalVarsProvider: GlobalvarsProvider) { }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      console.log(err);
      this.presentToast('Error while selecting image.');
    });
  }

// Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}

// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

public sendFileToDogProfilePage() {
  var fileToUpload = this.pathForImage(this.lastImage);
  var filename = this.lastImage;

  this.globalVarsProvider.setFileToUpload(fileToUpload);
  this.globalVarsProvider.setFilename(filename);
}

//console log from xcode, it is passing the image data to the global vars upon clicking the 'upload' button
// 2018-11-27 20:19:27.108624-0700 pup[12395:714047] Global Vars, File To Upload: file:///Users/mcresswell/Library/Developer/CoreSimulator/Devices/F4059D21-84F2-4017-B2B0-460C277232CE/data/Containers/Data/Application/A7DDADD8-28BA-44D1-AD3A-39FD6915A652/Library/NoCloud/1543375164243.jpg
// 2018-11-27 20:19:27.108926-0700 pup[12395:714047] Global Vars, Pup Image Filename: 1543375164243.jpg
public uploadImage() {
  this.sendFileToDogProfilePage();
}
}
