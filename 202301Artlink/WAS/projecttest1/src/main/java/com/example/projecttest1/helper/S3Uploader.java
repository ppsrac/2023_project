package com.example.projecttest1.helper;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import com.example.projecttest1.exception.helper.S3DeleteFailException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class S3Uploader {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Autowired
    private AmazonS3 amazonS3;

    public String upload(String folderName, String fileName, MultipartFile multipartFile) throws IOException {
        String s3FileName = folderName + "/" + UUID.randomUUID() + "-" + fileName;

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getInputStream().available());
        PutObjectRequest request = new PutObjectRequest(bucket, s3FileName, multipartFile.getInputStream(), objMeta);

        request.setCannedAcl(CannedAccessControlList.PublicRead);
        amazonS3.putObject(request);
        return amazonS3.getUrl(bucket, s3FileName).toString();
    }

    //올라간 사진 삭제
    public boolean delete(String FileName) throws Exception{
        try{
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, FileName));
            return true;
        }
        catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    //이미 올라갔던 사진 삭제 후 재 생성.
    public String modify(String folderName, String fileName, MultipartFile multipartFile) throws Exception{
        try{
            if(!delete(fileName)){
                throw new S3DeleteFailException("Delete failed");
            }
            return upload(folderName, fileName, multipartFile);
        }
        catch(S3DeleteFailException de){
            de.printStackTrace();
            throw de;
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
}
