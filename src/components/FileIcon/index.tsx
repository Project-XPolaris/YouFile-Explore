import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { convertSlash, getPathBasename } from '../../utils/path'
import DescriptionIcon from '@material-ui/icons/Description'
import { JSFileIcon } from './JSFileIcon'
import { MusicFileIcon } from './MusicFileIcon'
import { PythonFileIcon } from './PythonFileIcon'
import { TSFileIcon } from './TSFileIcon'
import { VideoFileIcon } from './VideoFileIcon'
import { ConfFileIcon } from './ConfFileIcon'
import { CSSFileIcon } from './CssFileIcon'
import { HTMLFileIcon } from './HTMLFileIcon'
import { ImageFileIcon } from './ImageFileIcon'
import { WordFileIcon } from './WordFileIcon'
import { JSONFileIcon } from './JSONFileIcon'
import { PDFFileIcon } from './PDFFileIcon'
import { PowerPointFileIcon } from './PowerPointFileIcon'
import { ExcelFileIcon } from './ExcelFileIcon'
import { TorrentFileIcon } from './TorrentFileIcon'
import { EXEFileIcon } from './EXEFileIcon'
import { MarkdownFileIcon } from './MarkdownFileIcon'
import { ArchiveFileIcon } from './ArchiveFileIcon'

const useStyles = makeStyles({
  main: {},
})

interface FileIconPropsType {
  fileName: string
}

export default function FileIcon ({ fileName }: FileIconPropsType) {
  const classes = useStyles()
  fileName = convertSlash(fileName)
  if (fileName.endsWith('/')) {
    fileName = fileName.slice(0, fileName.length - 1)
  }
  const basename = getPathBasename(fileName)
  if (basename === undefined) {
    return <DescriptionIcon />
  }
  const ext = basename.split('.').pop()
  if (ext === undefined) {
    return <DescriptionIcon />
  }
  switch (ext) {
    case 'js':
    case 'jsx':
      return <JSFileIcon />
    case 'mp3':
    case 'wav':
    case 'flac':
    case 'aac':
    case 'ogg':
    case 'm4a':
      return <MusicFileIcon />
    case 'py':
      return <PythonFileIcon />
    case 'ts':
    case 'tsx':
      return <TSFileIcon />
    case 'mp4':
    case 'mkv':
      return <VideoFileIcon />
    case 'conf':
      return <ConfFileIcon />
    case 'css':
      return <CSSFileIcon />
    case 'html':
      return <HTMLFileIcon />
    case 'jpg':
    case 'png':
    case 'gif':
      return <ImageFileIcon />
    case 'doc':
    case 'docx':
      return <WordFileIcon />
    case 'pdf':
      return <PDFFileIcon />
    case 'ppt':
    case 'pptx':
      return <PowerPointFileIcon />
    case 'xls':
    case 'xlsx':
      return <ExcelFileIcon />
    case 'torrent':
      return <TorrentFileIcon />
    case 'exe':
      return <EXEFileIcon />
    case '7z':
    case 'rar':
    case 'zip':
    case 'tar':
    case 'bz':
    case 'gz':
    case 'lzma':
    case 'tgz':
      return <ArchiveFileIcon />
    case 'json':
      return <JSONFileIcon />
    case 'md':
      return <MarkdownFileIcon />
    default:
      return <DescriptionIcon />
  }
  return (
    <div className={classes.main}>

    </div>
  )
}
