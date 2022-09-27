import { AssetTypes, FfmpegResult } from '@chat-app/types';
import { exec } from 'child_process';

export const execFfmpeg = (href: string): Promise<FfmpegResult> =>
  new Promise((res, rej) => {
    exec(
      `ffprobe -v quiet -show_streams -select_streams v:0 -of json "${href}"`,
      (err, stdout) => {
        if (err) {
          rej(err);
          return;
        }
        res(JSON.parse(stdout) as FfmpegResult);
      }
    );
  });

export const getAssetType = (mimetype: string): AssetTypes => {
  const [type] = mimetype.split('/');
  switch (type) {
    case 'audio':
      return AssetTypes.Audio;
    case 'video':
      return AssetTypes.Video;
    case 'image':
      return AssetTypes.Image;
    case 'pdf':
      return AssetTypes.Pdf;
    default:
      return AssetTypes.Other;
  }
};
