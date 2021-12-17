package com.communication.plateforme.utils.mapper;

import com.communication.plateforme.utils.transferObject.SubplateformeTO;
import com.communication.plateforme.model.Post;
import com.communication.plateforme.model.Subplateforme;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubplateformeMapper {
    @Mapping(target = "numberOfPosts", expression = "java(mapPosts(subplateforme.getPosts()))")
    SubplateformeTO mapSubplatefromeToTO(Subplateforme subplateforme);

    default Integer mapPosts(List<Post> numberOfPosts) {
        return numberOfPosts.size();
    }

    @InheritInverseConfiguration
    @Mapping(target = "posts", ignore = true)
    Subplateforme mapTOTosubplateforme(SubplateformeTO subplateformeTO);
}

