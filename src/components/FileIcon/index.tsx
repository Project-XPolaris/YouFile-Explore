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
  main: {}
})

interface FileIconPropsType {
  fileName: string
  className?:any
}

export default function FileIcon ({ fileName, className }: FileIconPropsType) {
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
      return <JSFileIcon className={className} />
    case 'mp3':
    case 'wav':
    case 'flac':
    case 'aac':
    case 'ogg':
    case 'm4a':
      return <MusicFileIcon className={className}/>
    case 'py':
      return <PythonFileIcon className={className}/>
    case 'ts':
    case 'tsx':
      return <TSFileIcon className={className}/>
    case 'mp4':
    case 'mkv':
      return <VideoFileIcon className={className}/>
    case 'conf':
      return <ConfFileIcon className={className}/>
    case 'css':
      return <CSSFileIcon className={className}/>
    case 'html':
      return <HTMLFileIcon className={className}/>
    case 'jpg':
    case 'png':
    case 'gif':
      return <ImageFileIcon className={className}/>
    case 'doc':
    case 'docx':
      return <WordFileIcon className={className}/>
    case 'pdf':
      return <PDFFileIcon className={className}/>
    case 'ppt':
    case 'pptx':
      return <PowerPointFileIcon className={className}/>
    case 'xls':
    case 'xlsx':
      return <ExcelFileIcon className={className}/>
    case 'torrent':
      return <TorrentFileIcon className={className}/>
    case 'exe':
      return <EXEFileIcon className={className}/>
    case '7z':
    case 'rar':
    case 'zip':
    case 'tar':
    case 'bz':
    case 'gz':
    case 'lzma':
    case 'tgz':
      return <ArchiveFileIcon className={className}/>
    case 'json':
      return <JSONFileIcon className={className}/>
    case 'md':
      return <MarkdownFileIcon className={className}/>
    default:
      return <DescriptionIcon className={className}/>
  }
  return (
    <div className={className}>

    </div>
  )
}
