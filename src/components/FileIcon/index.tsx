import React, { ReactElement } from 'react'
import { convertSlash, getPathBasename } from '../../utils/path'
import DescriptionIcon from '@material-ui/icons/Description'
import { JSFileIcon } from './JSFileIcon'
import { MusicFileIcon } from './MusicFileIcon'
import { PythonFileIcon } from './PythonFileIcon'
import { TSFileIcon } from './TSFileIcon'
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
import { Mp3FileIcon } from './Mp3FileIcon'
import { WavFileIcon } from './WavFileIcon'
import { FlacFileIcon } from './FlacFileIcon'
import { OggFileIcon } from './OggFileIcon'
import { Mp4FileIcon } from './Mp4FileIcon'
import { MkvFileIcon } from './MkvFileIcon'
import { PngFileIcon } from './PngFileIcon'
import { SevenZFileIcon } from './7zFileIcon'
import { RarFileIcon } from './RarFileIcon'
import { ZipFileIcon } from './ZipFileIcon'
import { TarFileIcon } from './TarFileIcon'
import { Bz2FileIcon } from './Bz2FileIcon'
import { EmptyFileIcon } from './EmptyFileIcon'
import { ThreeDsFileIcon } from './3dsFileIcon'
import { APKFileIcon } from './APKFileIcon'
import { ASPFileIcon } from './ASPFileIcon'
import { AVIFileIcon } from './AVIFileIcon'
import { BashFileIcon } from './BashFileIcon'
import { ClangFileIcon } from './ClangFileIcon'
import { CppFileIcon } from './CppFileIcon'
import { CSharpFileIcon } from './CSharpFileIcon'
import { CSVFileIcon } from './CSVFileIcon'
import { DEBFileIcon } from './DEBFileIcon'
import { DWGFileIcon } from './DWGFileIcon'
import { GifFileIcon } from './GifFileIcon'
import { FontFileIcon } from './FontFileIcon'
import { GolangFileIcon } from './GolangFileIcon'
import { HeaderFileIcon } from './HeaderFileIcon'
import { IllustratorFileIcon } from './IllustratorFileIcon'
import { JavaFileIcon } from './JavaFileIcon'
import { KotlinFileIcon } from './KotlinFileIcon'
import { LogFileIcon } from './LogFileIcon'
import { LuaFileIcon } from './LuaFileIcon'
import { PhotoshopFileIcon } from './PhotoshopFileIcon'
import { RubyFileIcon } from './RubyFileIcon'
import { RustFileIcon } from './RustFileIcon'
import { TxtFileIcon } from './TxtFileIcon'
import { YamlFileIcon } from './YamlFileIcon'
import { XmlFileIcon } from './XmlFileIcon'
import { InkFileIcon } from './InkFileIcon'
import { UrlFileIcon } from './UrlFileIcon'
import { ImgFileIcon } from './ImgFileIcon'

interface FileIconPropsType {
  fileName: string
  className?: string,
}

const FileIcon = ({ fileName, className }: FileIconPropsType): ReactElement => {
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
    case '3ds':
      return <ThreeDsFileIcon className={className} />
    case 'apk':
      return <APKFileIcon className={className} />
    case 'asp':
      return <ASPFileIcon className={className} />
    case 'avi':
      return <AVIFileIcon className={className} />
    case 'sh':
      return <BashFileIcon className={className} />
    case 'epub':
    case 'mobi':
      return <BashFileIcon className={className} />
    case 'c':
      return <ClangFileIcon className={className} />
    case 'cpp':
      return <CppFileIcon className={className} />
    case 'cs':
      return <CSharpFileIcon className={className} />
    case 'csv':
      return <CSVFileIcon className={className} />
    case 'deb':
      return <DEBFileIcon className={className} />
    case 'dwg':
      return <DWGFileIcon className={className} />
    case 'js':
    case 'jsx':
      return <JSFileIcon className={className} />
    case 'mp3':
      return <Mp3FileIcon className={className} />
    case 'wav':
      return <WavFileIcon className={className} />
    case 'flac':
      return <FlacFileIcon className={className} />
    case 'aac':
      return <MusicFileIcon className={className} />
    case 'ogg':
      return <OggFileIcon className={className} />
    case 'ttf':
      return <FontFileIcon className={className} />
    case 'go':
      return <GolangFileIcon className={className} />
    case 'h':
      return <HeaderFileIcon className={className} />
    case 'ai':
      return <IllustratorFileIcon className={className} />
    case 'java':
      return <JavaFileIcon className={className} />
    case 'kt':
      return <KotlinFileIcon className={className} />
    case 'log':
      return <LogFileIcon className={className} />
    case 'psd':
      return <PhotoshopFileIcon className={className} />
    case 'php':
      return <PngFileIcon className={className} />
    case 'rs':
      return <RustFileIcon className={className} />
    case 'txt':
      return <TxtFileIcon className={className} />
    case 'yaml':
    case 'yml':
      return <YamlFileIcon className={className} />
    case 'xml':
      return <XmlFileIcon className={className} />
    case 'rb':
      return <RubyFileIcon className={className} />
    case 'lua':
      return <LuaFileIcon className={className} />
    case 'm4a':
      return <MusicFileIcon className={className} />
    case 'py':
      return <PythonFileIcon className={className} />
    case 'ts':
    case 'tsx':
      return <TSFileIcon className={className} />
    case 'mp4':
      return <Mp4FileIcon className={className} />
    case 'mkv':
      return <MkvFileIcon className={className} />
    case 'conf':
      return <ConfFileIcon className={className} />
    case 'css':
      return <CSSFileIcon className={className} />
    case 'html':
      return <HTMLFileIcon className={className} />
    case 'jpg':
      return <ImageFileIcon className={className} />
    case 'png':
      return <PngFileIcon className={className} />
    case 'gif':
      return <GifFileIcon className={className} />
    case 'doc':
    case 'docx':
      return <WordFileIcon className={className} />
    case 'pdf':
      return <PDFFileIcon className={className} />
    case 'ppt':
    case 'pptx':
      return <PowerPointFileIcon className={className} />
    case 'xls':
    case 'xlsx':
      return <ExcelFileIcon className={className} />
    case 'torrent':
      return <TorrentFileIcon className={className} />
    case 'exe':
      return <EXEFileIcon className={className} />
    case '7z':
      return <SevenZFileIcon className={className} />
    case 'rar':
      return <RarFileIcon className={className} />
    case 'zip':
      return <ZipFileIcon className={className} />
    case 'tar':
      return <TarFileIcon className={className} />
    case 'bz':
      return <Bz2FileIcon className={className} />
    case 'gz':
    case 'lzma':
    case 'tgz':
      return <TarFileIcon className={className} />
    case 'json':
      return <JSONFileIcon className={className} />
    case 'md':
      return <MarkdownFileIcon className={className} />
    case 'eps':
    case 'svg':
      return <ImageFileIcon className={className} />
    case 'ink':
      return <InkFileIcon className={className} />
    case 'url':
      return <UrlFileIcon className={className} />
    case 'img':
    case 'iso':
      return <ImgFileIcon className={className} />
    default:
      return <EmptyFileIcon className={className} />
  }
}
export default FileIcon
