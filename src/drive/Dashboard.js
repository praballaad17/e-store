import React from 'react'
import { Container } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import {useFolder} from '../hooks/useFolder'
import AddFileButton from './AddFileButton'
import AddFolderButton from './AddFolderButton'
import Folder from './Folder'
import File from './File'
import FolderBreadCrumbs from './FolderBreadCrumbs'
import NavBarComponent from './NavBar'


export default function Dashboard() {
    const { folderId } = useParams()
    const { state = {} } = useLocation()
    const { folder, childFolders, childFiles } =  useFolder(folderId, state.folder)

    return (
        <>
            <NavBarComponent />
            <Container fluid>
            <div className="d-flex align-items-center mt-2">
                <FolderBreadCrumbs currentFolder={folder} />
                <AddFileButton currentFolder={folder} />
                <AddFolderButton currentFolder={folder} />
             </div>
                
                {childFolders.length > 0 && (
                    <div className="d-flex flex-wrap">
                        {childFolders.map( childFolder => (
                            <div 
                                key={childFolder.id}
                                style={{ maxWidth: "200px"}}
                                className="p-2">
                                <Folder folder={childFolder} />
                            </div>
                        )
                        )}
                    </div>
                )}

                
                {childFolders.length > 0 && childFiles.length > 0 && <hr />}

                {childFiles.length > 0 && (
                    <div className="d-flex flex-wrap">
                        {childFiles.map( childFile => (
                            <div 
                                key={childFile.id}
                                style={{ maxWidth: "200px"}}
                                className="p-2">
                                <File file={childFile} />
                            </div>
                        )
                        )}
                    </div>
                )}
            </Container>

        </>
    )
}
