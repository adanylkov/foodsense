﻿// <auto-generated />
using System;
using FoodSense.Infrastructure.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FoodSense.Infrastructure.Migrations
{
    [DbContext(typeof(FoodDbContext))]
    [Migration("20230825094337_SaveLatestExpirationFromOpenedInFoodAggregate")]
    partial class SaveLatestExpirationFromOpenedInFoodAggregate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("FoodSense.Domain.Aggregates.FoodAggregate", b =>
                {
                    b.Property<string>("Barcode")
                        .HasColumnType("nvarchar(450)");

                    b.Property<long>("ExpirationFromOpened")
                        .HasColumnType("bigint");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Barcode");

                    b.ToTable("FoodAggregates");
                });

            modelBuilder.Entity("FoodSense.Domain.Aggregates.FoodAggregate", b =>
                {
                    b.OwnsMany("FoodSense.Domain.ValueObjects.ExpirationInfo", "_expirationInfos", b1 =>
                        {
                            b1.Property<string>("FoodAggregateBarcode")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int");

                            SqlServerPropertyBuilderExtensions.UseIdentityColumn(b1.Property<int>("Id"));

                            b1.Property<DateTime?>("OpenedAt")
                                .HasColumnType("datetime2");

                            b1.Property<DateTime>("_expirationDate")
                                .HasColumnType("datetime2");

                            b1.Property<long>("_expirationFromOpened")
                                .HasColumnType("bigint");

                            b1.HasKey("FoodAggregateBarcode", "Id");

                            b1.ToTable("ExpirationInfo");

                            b1.WithOwner()
                                .HasForeignKey("FoodAggregateBarcode");
                        });

                    b.OwnsOne("FoodSense.Domain.ValueObjects.Nutrition", "Nutrition", b1 =>
                        {
                            b1.Property<string>("FoodAggregateBarcode")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<double>("Calories")
                                .HasColumnType("float");

                            b1.Property<double>("Carbohydrates")
                                .HasColumnType("float");

                            b1.Property<double>("Cholesterol")
                                .HasColumnType("float");

                            b1.Property<double>("Fat")
                                .HasColumnType("float");

                            b1.Property<double>("Fiber")
                                .HasColumnType("float");

                            b1.Property<double>("Potassium")
                                .HasColumnType("float");

                            b1.Property<double>("Protein")
                                .HasColumnType("float");

                            b1.Property<double>("SaturatedFat")
                                .HasColumnType("float");

                            b1.Property<double>("Sodium")
                                .HasColumnType("float");

                            b1.Property<double>("Sugar")
                                .HasColumnType("float");

                            b1.Property<double>("TransFat")
                                .HasColumnType("float");

                            b1.Property<double>("UnsaturatedFat")
                                .HasColumnType("float");

                            b1.HasKey("FoodAggregateBarcode");

                            b1.ToTable("FoodAggregates");

                            b1.WithOwner()
                                .HasForeignKey("FoodAggregateBarcode");
                        });

                    b.Navigation("Nutrition")
                        .IsRequired();

                    b.Navigation("_expirationInfos");
                });
#pragma warning restore 612, 618
        }
    }
}
