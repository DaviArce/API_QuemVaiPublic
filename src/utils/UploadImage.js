const guid = require("guid");
const azure = require("azure-storage");

class UploadImages {
  static async uploadPhoto(photo) {
    if (!photo) {
      return "https://quemvai.blob.core.windows.net/system/user 1.png";
    }

    const blobSvc = azure.createBlobService(
      ""
    );

    let filename = guid.raw().toString() + ".jpg";

    let matches = photo.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    let type = matches[1];

    let buffer = Buffer.from(matches[2], "base64");

    try {
      await blobSvc.createBlockBlobFromText(
        "fotos",
        filename,
        buffer,
        {
          contentType: type,
        },
        function (error, result, response) {
          if (error) {
            filename = "default.png";
          }
        }
      );
    } catch (err) {
      return err;
    }
    const fileUrl = `https://quemvai.blob.core.windows.net/fotos/${filename}`;
    return fileUrl;
  }
}

module.exports = UploadImages;
