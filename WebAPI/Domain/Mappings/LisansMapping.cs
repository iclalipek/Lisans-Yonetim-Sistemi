using AutoMapper;
using Abstractions.DTOS;
using Domain.Entities;

namespace Domain.Mappings
{
    public class LisansMapping : Profile
    {
        public LisansMapping()
        {
            CreateMap<LisansDTO, Lisans>().ReverseMap();
            CreateMap<LisansUpdateDTO, Lisans>().ReverseMap();
            CreateMap<LisansCreateDTO, Lisans>().ReverseMap();
        }
    }
}
